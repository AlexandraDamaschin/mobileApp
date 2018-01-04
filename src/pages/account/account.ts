import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/User';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthProvider) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  logout() {
    this._auth.logout();
  }

}
