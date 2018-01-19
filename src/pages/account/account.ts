import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  private user: User;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private _auth: AuthProvider) {
  this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    
  }
  logout() {
    this._auth.logout();
  }

  changePassword(){
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'oldPassword',
      placeholder: 'Old Password',
      type: 'password'
    });
    alert.addInput({
      name: 'newPassword1',
      placeholder: 'New Password',
      type: 'password',
    });
    alert.addInput({
      name: 'newPassword1',
      placeholder: 'Confirm New Password',
      type: 'password',
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
       console.log("write logic change password")
      }
    });

    alert.present();
  }

}
