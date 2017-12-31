import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform, ViewController, IonicPage, NavController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';
import { Geolocation } from '@ionic-native/geolocation';
import * as _ from 'lodash';


declare var google;

@IonicPage()
@Component({
  selector: 'page-my-photos',
  templateUrl: 'my-photos.html',
})
export class MyPhotosPage {
  dbData: Photo[];
  photos: any;
  segment: string = "map";
  markers: any[];

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  location: any;
  mapLoaded: any;

  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform,
    public geolocation: Geolocation, public viewCtrl: ViewController, public db: AngularFireDatabase) {
      this.markers = [];

  }
  ionViewDidLoad(): void {
    this.loadData();
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      // this.autocompleteService = new google.maps.places.AutocompleteService();
      // this.placesService = new google.maps.places.PlacesService(this.maps.map);
      // this.searchDisabled = false;
    });
  }

  segmentChanged($event) {
    console.log("changd");
    console.log(this.segment);
  }


  loadData() {
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      this.dbData = res;
      this.plotPins(res);
    }, (error: Response) => { console.log("no auth") });
  }

  plotPins(data: Photo[]) {

    this.clearMarkers();
    for (var i = 0; i < data.length; i++) {
      this.addMarkerWithTimeout(data[i],  i * 200);
    }
  }

  addMarkerWithTimeout(p, timeout) {
    // https://developers.google.com/maps/documentation/javascript/markers
    window.setTimeout(() => {
      this.markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(p.lat, p.lng),
            animation: google.maps.Animation.DROP,
            map : this.maps.map,
            icon: "http://maps.gstatic.com/mapfiles/ms2/micons/green.png"
      }));
    }, timeout);
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}