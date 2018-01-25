import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Photo } from '../../models/Photo';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage {
  dbData: Photo[];
  photos: any;
  imageURL: string;
  slides:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
      this.imageURL = '';
  }

  ionViewDidLoad() {
    this.loadImage();
  }

  // load clicked image from my- images page 
  loadImage(){
  this.imageURL  = this.navParams.get('imageURL');
   console.log(this.imageURL);
  }
// go back to my photos page
  onBackButton(){
    this.navCtrl.pop();
  }
}
