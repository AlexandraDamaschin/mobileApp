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
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing';

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

  public sendTo   : any;
  public subject  : string = 'Message from Social Sharing App';
  public message  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';

  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform,
     public geolocation: Geolocation, public viewCtrl: ViewController, public db: AngularFireDatabase, private socialSharing : SocialSharing) {
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
      this.addMarkerWithTimeout(data[i], i * 200);
    }
  }

  addMarkerWithTimeout(p: Photo, timeout) {

    // https://developers.google.com/maps/documentation/javascript/markers
    window.setTimeout(() => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(p.lat, p.lng),
        animation: google.maps.Animation.DROP,
        map: this.maps.map,
        icon: "http://maps.gstatic.com/mapfiles/ms2/micons/green.png"
      })
      this.addInfoWindowToMarker(marker, p);
      this.markers.push(marker);
    }, timeout);
  }

  addInfoWindowToMarker(marker: any, p: Photo) {
    let date = moment(parseInt(p.date)).format('DD/MM/YYYY');
    console.log(date);
    let contentString = `
    <div id="content"><h1>${date}</h1>
      <div id="bodyContent">
        <img src="${p.downloadURL}" width="250">
        <p>${p.address}</p>
      </div>
    </div>`;
  

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', () => {
      infowindow.open(this.maps.map, marker);
    });
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  shareViaFacebook()
  {
     this.platform.ready()
     .then(() =>
     {
        this.socialSharing.canShareVia('com.apple.social.facebook', this.message, this.image, this.uri)
        .then((data) =>
        {

           this.socialSharing.shareViaFacebook(this.message, this.image, this.uri)
           .then((data) =>
           {
              console.log('Shared via Facebook');
           })
           .catch((err) =>
           {
              console.log('Was not shared via Facebook');
           });

        })
        .catch((err) =>
        {
           console.log('Not able to be shared via Facebook');
        });

     });
  }

    //open edit details page
    openEdit(){
      this.navCtrl.push('EditPicturePage')
    }

}