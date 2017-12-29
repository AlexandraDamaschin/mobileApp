import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform, ViewController, IonicPage, NavController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@IonicPage()
@Component({
  selector: 'page-all-photos',
  templateUrl: 'all-photos.html',
})
export class AllPhotosPage {

  dbData: Photo[];
  photos: any;
  segment: string = "map";

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

  }
  ionViewDidLoad(): void {
    this.loadData();

    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
    // this.autocompleteService = new google.maps.places.AutocompleteService();
    // this.placesService = new google.maps.places.PlacesService(this.maps.map);
    // this.searchDisabled = false;
    });
  }


  loadData() {
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      console.log(res);
      this.dbData = res;
    });


  }

}
