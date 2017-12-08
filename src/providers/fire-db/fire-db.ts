import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FireDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireDbProvider {

  items: AngularFireList<any[]>;
  constructor(public http: HttpClient, private _firebaseAuth: AngularFireAuth, private _db: AngularFireDatabase) {
  }


  loadImageStream() {
    // this.items = this._db.list('/capturedPhotos').query.endAt(50);
  }

}
