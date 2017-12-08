import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/Photo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;
  items2: Photo[];
  photos: any;
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {

  }

  loadData() {
    this.items = this.db.list<Photo>('capturedPhotos/').snapshotChanges();
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      console.log(res);
      this.items2 = res;
    });

   
  }

}
