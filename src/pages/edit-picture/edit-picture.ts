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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.loadData();

  }
  loadData() {
    this.db.list<Photo>('capturedPhotos/').valueChanges().subscribe((res: Photo[]) => {
      this.dbData = res;
    }, (error: Response) => { console.log("no auth") });
  }
// go back to my photos page
  onBackButton(){
    this.navCtrl.push('MyPhotosPage')
  }
}
