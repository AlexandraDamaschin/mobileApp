import { EventType, MapAction } from '../../models/Enum';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, Platform, Tab, ViewController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';
import { Geolocation } from '@ionic-native/geolocation';
import * as _ from 'lodash';
import { MapEvent } from '../../models/common';
import { NotificationProvider } from '../../providers/notification/notification';
import * as moment from 'moment';

declare var google;

@IonicPage()
@Component({
  selector: 'page-all-photos',
  templateUrl: 'all-photos.html',
})
export class AllPhotosPage {

  @ViewChild('mapall') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  dbData: Photo[];
  photos: any;
  segment: string = "map";
  heatmap: any;
  hmPoints: any[];
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  location: any;
  mapLoaded: any;
  private _markers: any[];
  private _pageName: string;
  infoWindows: any[];



  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform,
    public geolocation: Geolocation, public viewCtrl: ViewController, public db: AngularFireDatabase, private _notification: NotificationProvider) {
    _notification.emitter.subscribe((data) => {
      if (data.type === EventType.map && this._pageName == 'AllPhotosPage')
        this.mapZoomChanged(data.obj);
    })
    this.infoWindows = [];
  }
  ionViewDidLoad(): void {
    this.loadData();
    this._pageName = this.navCtrl.getActive().name;
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      this.addCloseListener();
    });
  }

  addCloseListener() {
    google.maps.event.addListener(this.maps.map, "click", () => {
      for (let i = 0; i < this.infoWindows.length; i++) {
        this.infoWindows[i].close();
      }
    })
  }

  loadData() {
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      this.dbData = res;
      this.initialiseHeatMap(res);
    }, (error: Response) => { console.log("no auth") });
  }

  initialiseHeatMap(data: Photo[]) {
    this.hmPoints = [];
    this._markers = [];
    _.forEach(data, (p: Photo) => {
      //add heatmap markers
      this.hmPoints.push(new google.maps.LatLng(p.lat, p.lng));

    });
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.hmPoints,
      map: this.maps.map
    });
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
  }

  mapZoomChanged(data: MapEvent) {
    //clear heat map and add pins since youre zoomed in enough
    if (data.newZoom == 10 && data.oldZoom == 9) {
      this.clearHeatMapAndAddMapPins();
    }
    //conversely remove pins and add heat map if zoomed out enough
    else if (data.newZoom == 9 && data.oldZoom == 10) {
      this.clearPinsAndAddHeatMap();
      //apply the heatmap back to the map
    }
  }

  clearHeatMapAndAddMapPins() {
    //clear the heatmap
    this.heatmap.setMap(null);
    for (var i = 0; i < this.dbData.length; i++) {
      this.addMarkerWithTimeout(this.dbData[i], i * 100, this.maps.map);
    }
  }

  clearPinsAndAddHeatMap() {
    //physicall clearing markers so if re-adding animation is re-fired
    _.forEach(this._markers, (marker) => {
      marker.setMap(null);
    })
    this._markers = [];
    this.heatmap.setMap(this.maps.map);
  }

  addInfoWindowToMarker(marker: any, p: Photo) {
    let date = moment.unix(parseInt(p.date)).format('DD/MM/YYYY HH:MM');
    let contentString = `
    <div id="content"><h1>${date}</h1>
      <div id="bodyContent">
        <img src="${p.downloadURL}" width="250"> 
        <p><b>${p.email}</b></p>
        ${this.prettifyAddress(p.address)}
      </div>
    </div>`;


    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    for (let i = 0; i < this.infoWindows.length; i++) {
      this.infoWindows[i].close();
    };
    marker.addListener('click', () => {
      infowindow.open(this.maps.map, marker);
    });
    this.infoWindows.push(infowindow);
    
  }


  addMarkerWithTimeout(p: Photo, timeout: number, map) {
    // https://developers.google.com/maps/documentation/javascript/markers
    window.setTimeout(() => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(p.lat, p.lng),
        animation: google.maps.Animation.DROP,
        map: map,
        icon: "http://maps.gstatic.com/mapfiles/ms2/micons/green.png"
      })
      this.addInfoWindowToMarker(marker, p);
      this._markers.push(marker);
    }, timeout);
  }

  prettifyAddress(add: string) {
    let result = '';
    let elems = add.split(',');
    elems.forEach(element => {
      result += `<p>${element}</p>`
    });
    return result;
  }

}
