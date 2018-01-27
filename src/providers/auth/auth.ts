import { User } from '../../models/User';
import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EventType, LoadingAction } from '../../models/Enum';
import { LoadingData } from '../../models/common';
import { UserDetailsService } from '../user-details/user-details';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthProvider {
  private _userAuth: firebase.User;
  private _userDetails: User;

  constructor(private _firebaseAuth: AngularFireAuth, private _events: Events, private _userDetailsService: UserDetailsService, private _db: AngularFireDatabase) {
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show));
    this.subscribeToUser();
  }

  // this needs to be removed, and the my phots page should be using the user object and not the user auth object
  get user(): firebase.User {

    return this._userAuth;
  }
  get userDetails(): User {
    return this._userDetails;
  }

  subscribeToUser() {
    this._firebaseAuth.authState.subscribe((user: firebase.User) => {
      this._events.publish(EventType.loading, new LoadingData(LoadingAction.hideAll));
      //authenticated
      if (user) {
        this._userAuth = user;
        this.loadUserDetails(user.uid).subscribe((user: User) => {
          console.log(user);
          this._userDetails = user;
          this._events.publish(EventType.navigate, { page: 'TabsPage' });
        }, (error: Response) => { console.log("no auth") });
      }
      
      else {
        //unauthenticated
        if (this._userAuth) {
          //there was a user authenticated but it has expired, so alert the user that it's happened
          this._events.publish(EventType.error, { message: 'Login Session has expired, please login again' });
        }
        this._events.publish(EventType.navigate, { page: 'LoginPage' });
        this._userAuth = null;
        this._userDetails = null;
      }
    });
  }

  login(user: User) {
    this._events.publish(EventType.loading, new LoadingData(LoadingAction.show, "Logging in, please wait"));
    this._firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((usr: firebase.User) => {
      this._userAuth = usr;
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

        this._userDetailsService.createUser(user).subscribe(uData => {
        }, )
      }).catch(err => {
        this._events.publish(EventType.error, err);
      });



    }).catch(err => {
      this._events.publish(EventType.error, err);
    });
  }

  loadUserDetails(uid: string): Observable<User> {
    // this._db.object<User>(`users/${uid}`).update({key: value}).then(res => {
    //   ...something should happen here
    // })
    return this._db.object<User>(`users/${uid}`).valueChanges();
  }
}
