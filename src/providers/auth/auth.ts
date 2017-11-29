import { User } from '../../models/User';
import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EventType, LoadingAction } from '../../models/Enum';
import { LoadingData } from '../../models/common';



@Injectable()
export class AuthProvider {

  constructor(private _firebaseAuth: AngularFireAuth, private _events: Events) {
  }

  login(user: User) {
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show, "Logging in, please wait"));
    this._firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((user: firebase.User) => {

      this._firebaseAuth.authState.subscribe((user: firebase.User) => {
        if (user) {
          this._events.publish(EventType.loading, new LoadingData(LoadingAction.hide));
          this._events.publish(EventType.navigate, { page: 'TabsPage' });
          console.log(user);
        }
        else {
          this._events.publish(EventType.loading, new LoadingData(LoadingAction.hideAll));
          this._events.publish(EventType.error, { message: 'Login Session has expired, please login again' });

          this._events.publish(EventType.navigate, { page: 'LoginPage' });
        }
      });

    }).catch(err => {
      this._events.publish(EventType.error, err);
    })
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => {
        this._events.publish(EventType.navigate, { page: 'LoginPage' })
        // this._userDetails = null;
        // this._router.navigate(['/login'])
      });
  }

}
