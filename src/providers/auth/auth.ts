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
  private _user: firebase.User;

  constructor(private _firebaseAuth: AngularFireAuth, private _events: Events) {
    this.subscribeToUser();
  }

  subscribeToUser() {
    this._firebaseAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this._events.publish(EventType.navigate, { page: 'TabsPage' });
        this._user = user;
      }
      else {
        this._events.publish(EventType.loading, new LoadingData(LoadingAction.hideAll));
        if(this._user){
          this._events.publish(EventType.error, { message: 'Login Session has expired, please login again' });
        }
        this._events.publish(EventType.navigate, { page: 'LoginPage' });
        this._user = null;
      }
    });
  }

  login(user: User) {
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show, "Logging in, please wait"));
    this._firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((usr: firebase.User) => {
      this._user = usr;
      this._events.publish(EventType.loading, new LoadingData(LoadingAction.hide));

    }).catch(err => {
      this._events.publish(EventType.error, err);
    })
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => {
        this._events.publish(EventType.navigate, { page: 'LoginPage' })
        // this._userDetails = null;
      });
  }

  sendPasswordReset(email: string) {
    this._firebaseAuth.auth.sendPasswordResetEmail(email).then((res) => {
      this._events.publish(EventType.error, {
        message: `An email has been sent to ${email}. Please follow the instructions contained in this email to reset your password`
      });
    }
    ).catch((err) => {
      this._events.publish(EventType.error, err);

    });
  }
}
