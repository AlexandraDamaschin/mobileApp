import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/User';
import { FireDbProvider } from '../../providers/fire-db/fire-db';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  private Test: string;
  private _username: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private _auth: AuthProvider, private _fireDB:FireDbProvider) {
  this.user = new User();
  this._auth.subscribeToUser();
  this._username = this._auth.userDetails.userName;
 
  }

  get username(): string
  {
      return this._username;
  }
  set username(username: string)
  {
      this._username = username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    console.log(">>");
    console.log(this.Test);
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
      name: 'newPassword1',
      placeholder: 'New Password',
      type: 'password',
    });
    alert.addInput({
      name: 'newPassword2',
      placeholder: 'Confirm New Password',
      type: 'password',
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
       console.log("write logic change password")
       if(<string>data.newPassword1==<string>data.newPassword2)
       {
       this._auth.updatePassword(<string>data.newPassword1).then(() => {
      })
      .catch(err => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Ooops!',
        subTitle: err.message   
      });
      alert.addButton({
        text: 'Ok',
        handler: () => {
            this.changePassword();
        }
      
      });
      alert.present();  
      });
       
       }
       else {
          let alert = this.alertCtrl.create({
            title: 'Mismatched Passwords',
            subTitle: 'Please enter new password again'
            //,
           // buttons: ['Dismiss']
          });
          alert.addButton({
            text: 'Ok',
            handler: () => {
                this.changePassword();
            }
          });
      
          alert.present();  
       }
      }
    });

    alert.present();
  }

  changeUsername(){
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'UserName',
      value: this._auth.userDetails.userName,
      type: 'string'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this._auth.updateUserDetails(this._auth.userDetails.uid,<string>data.UserName)
       this._username = <string>data.UserName;
      }
    });

    alert.present();
   
  }

}
