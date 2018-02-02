import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform, ViewController, IonicPage, NavController, FabContainer, AlertController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';
import { Geolocation } from '@ionic-native/geolocation';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EditPicturePage } from '../edit-picture/edit-picture';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../../providers/auth/auth';
// import { FromUnixPipe } from '../../pipes/from-unix/from-unix';
import { PipesModule } from '../../pipes/pipes.module';


declare var google;

@IonicPage()
@Component({
  selector: 'page-my-photos',
  templateUrl: 'my-photos.html'
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
  public message  : string ;
  public image    : string = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string = 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform,
    public geolocation: Geolocation, public viewCtrl: ViewController, public db: AngularFireDatabase, private _auth: AuthProvider,private socialSharing : SocialSharing) {
    this.markers = [];
    this.message = "I'm using the SALLI Box";
  }
  ionViewDidLoad(): void {
    this.loadData();
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
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
      if (data[i].email == this._auth.user.email)
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
    let date = moment.unix(parseInt(p.date)).format('DD/MM/YYYY HH:MM');
    let contentString = `
    <div id="content"><h1>${date}</h1>
      <div id="bodyContent">
        <img src="${p.downloadURL}" width="250"> 
        <p>${p.address}</p>
        <p>${p.email}</p>
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


  shareViaInstagram(image:string)
  {
    this.socialSharing.canShareVia("instagram")
    .then(() => {
      this.socialSharing.shareViaInstagram(this.message, image)
        .then(() => {
        })
        .catch(() => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Your image has not been shared via Instagram, please try again later",
            buttons: ['OK']
          });
          alert.present();
        });
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Sharing via Instagram is not supported',
        subTitle: 'Have you the Instagram app installed?',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  shareViaFacebook(image:string)
  {
    this.socialSharing.canShareVia("facebook")
    .then(() => {
      this.socialSharing.shareViaFacebook(this.message, image, null)
        .then(() => {
        })
        .catch(() => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Your image has not been shared via Facebook, please try again later",
            buttons: ['OK']
          });
          alert.present();
        });
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Sharing via Facebook is not supported',
        subTitle: 'Have you the Facebook app installed?',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  shareViaTwitter(image:string)
  {
    this.socialSharing.canShareVia("twitter")
      .then(() => {
        this.socialSharing.shareViaTwitter(this.message, image, null)
          .then(() => {
          })
          .catch(() => {
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Your image has not been shared via Twitter, please try again later",
              buttons: ['OK']
            });
            alert.present();
          });
      })
      .catch(() => {
        let alert = this.alertCtrl.create({
          title: 'Sharing via Twitter is not supported',
          subTitle: 'Have you the Twitter app installed?',
          buttons: ['Dismiss']
        });
        alert.present();
      });


  }
  
  

  //open edit details page
  openEdit(imageURL: string) {
    this.navCtrl.push('EditPicturePage', {imageURL: imageURL})
  }

}