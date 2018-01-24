import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Photo } from '../../models/Photo';
import { AngularFireDatabase } from 'angularfire2/database';
import { Brightness } from '@ionic-native/brightness';

/**
 * Generated class for the EditPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var exec: any;
var require: any;

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage {
  dbData: Photo[];
  photos: any;

  constructor(
    private brightness: Brightness,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {

  }
  
  filter(image){
    let brightnessValue: number = 0.8;
    this.brightness.setBrightness(brightnessValue);
  }

// go back to my photos page
  onBackButton(){
    this.navCtrl.push('MyPhotosPage')
  }
}
