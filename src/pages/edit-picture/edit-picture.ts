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
  item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
      this.item = '';
  }

  ionViewDidLoad() {
    this.loadImage();
  }

  loadImage(){
  this.item  = this.navParams.get('image');
   console.log(this.item)
  }
  
// go back to my photos page
  onBackButton(){
    this.navCtrl.push('MyPhotosPage')
  }
}
