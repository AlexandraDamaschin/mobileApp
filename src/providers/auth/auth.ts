import {NavController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable()
export class AuthProvider {

  constructor(private _firebaseAuth: AngularFireAuth, public navCtrl: NavController,) {
  }

  login(email: string, password: string) {
    // this._notifier.display(false, '');
    this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then((user: firebase.User) => {

      this._firebaseAuth.authState.subscribe((user: firebase.User) => {
        if (user) {
          this.navCtrl.setRoot('TabsPage');
          // this._dataService.getUserDetails(user.uid).subscribe((res) => {
          //   this._userDetails = <User>res;
          //   this._router.navigate(['dashboard'])  
          // });
        }
        else {
          // this._userDetails = null;
          // this._router.navigate(['login']);
        }
      })

    }).catch(err => {
      console.log('Something went wrong:', err.message);
      // this._notifier.display(true, err.message);
    })
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => {
        // this._userDetails = null;
        // this._router.navigate(['/login'])
      });
  }

}
