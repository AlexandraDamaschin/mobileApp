import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/User';
import 'rxjs/add/operator/map';
/*
  Generated class for the FireDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireDbProvider {

  items: AngularFireList<any[]>;
  testUser: User;
  userDetails: AngularFireList<any[]>;
  constructor(public http: HttpClient, private _firebaseAuth: AngularFireAuth, private _db: AngularFireDatabase) {
  }


  loadImageStream() {
    // this.items = this._db.list('/capturedPhotos').query.endAt(50);
  }

  getUserDetails(uid: string) {
    // return this._db.list(`/users$/{uid}`);

    console.log('>>>xxxxx');
    console.log(this._db.list(`/users/${uid}`).query.equalTo(uid));
    console.log('**************************************');
    console.log(this._db.list<User>('/users/'+uid).query.toString() + ".json");
    // return this._db.object(`/users/${uid}`).valueChanges().subscribe((res: User) => {
    // }, (error: Response) => { console.log("no auth") });


    return this._db.list<User>('/users/'+uid).query.toJSON();
  }


  // getUserDetails(uid: string) {
  //   this.userDetails = this._db.list('/users/'+uid)
  //   console.log(this.userDetails);
  //   ;
  // }
}
