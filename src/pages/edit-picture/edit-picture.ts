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

  // load clicked image from my- images page 
  loadImage(){
  this.item  = this.navParams.get('image');
   console.log(this.item);
  }
  // blackWhiteFilter
  blackWhiteFilter(){
    console.log('blackWhiteFilter called');
  }
  //contrastFilter
  contrastFilter(){
    console.log('contrastFilter called');
  }
  //sepiaFilter
  sepiaFilter(){
    console.log('sepiaFilter called');
  }
  //shadowFilter
  shadowFilter(){
    console.log('shadowFilter called');
  }
  
// go back to my photos page
  onBackButton(){
    this.navCtrl.pop();
  }
}
