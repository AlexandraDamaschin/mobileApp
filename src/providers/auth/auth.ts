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
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show));
    this.subscribeToUser();
  }

  get user(): firebase.User{
    return this._user;
  }

  subscribeToUser() {
    this._firebaseAuth.authState.subscribe((user: firebase.User) => {
      this._events.publish(EventType.loading, new LoadingData(LoadingAction.hideAll));
      //authenticated
      if (user) {
        this._events.publish(EventType.navigate, { page: 'TabsPage' });
        this._user = user;
      }
      else {
        //unauthenticated
        if (this._user) {
          //there was a user authenticated but it has expired, so alert the user that it's happened
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

  register(user: User) {
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show, "Please wait"));

    this._firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res: firebase.User) => {

      user.registrationDate = new Date().toString();
      user.uid = res.uid;
      delete user.password; // we don't want to store users passwords in the db

      this._firebaseAuth.app.database().ref('users/' + res.uid).set(user).then(() => {
        this._events.publish(EventType.toast, { msg: 'Registration Successful' });
      }).catch(err => {
        this._events.publish(EventType.error, err);
      });

    }).catch(err => {
      this._events.publish(EventType.error, err);
    });
  }
}
