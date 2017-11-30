import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthProvider,
    private _alertCtrl: AlertController) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._auth.login(this.user);
  }

  forgotPassword() {
    let alert = this._alertCtrl.create({
      title: 'Forgot Password',
      subTitle: `Enter your email address and we will send you a link to reset your password`,
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Send',
          handler: data => {
            this._auth.sendPasswordReset(data.email);
          }
        }
      ]
    });
    alert.present();
  }

}
