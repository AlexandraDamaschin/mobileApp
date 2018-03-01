import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Photo } from '../../models/Photo';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage {
  // global variables needed
  dbData: Photo[];
  photos: any;
  imageURL: string;
  slides: any;

  constructor(
    // inject dependencies
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
    this.imageURL = '';
  }

  // load image from firebase
  ionViewDidLoad() {
    this.loadImage();
  }

  // load clicked image from my- images page 
  loadImage() {
    this.imageURL = this.navParams.get('imageURL');
    console.log(this.imageURL);
  }

  uploadEditPicture() {
    console.log('uploadEditPicture called');
  }
  
  // go back to my photos page
  onBackButton() {
    this.navCtrl.pop();
  }
}