import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Photo } from '../../models/Photo';
import { AngularFireDatabase } from 'angularfire2/database';
import { FireDbProvider } from '../../providers/fire-db/fire-db';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    let picture= this.navParams.get(this.photos);
  }
  
// go back to my photos page
  onBackButton(){
    this.navCtrl.push('MyPhotosPage')
  }
}
