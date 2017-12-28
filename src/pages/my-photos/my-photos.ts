import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';

@IonicPage()
@Component({
  selector: 'page-my-photos',
  templateUrl: 'my-photos.html',
})
export class MyPhotosPage {
  dbData: Photo[];
  photos: any;
  segment: string = "list";
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {

  }
  ionViewDidLoad() {
    this.loadData();
  }

  segmentChanged($event) {
    console.log(this.segment);
    console.log($event)
  }

  loadData() {
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      console.log(res);
      this.dbData = res;
    });


  }
}
