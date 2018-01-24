import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {

  }

filter (){
  var jimp = require("jimp");
// open a file called "lenna.png"
jimp.read("../assets/imgs/migrations.png", function (err, lenna) {
    if (err) throw err;
    lenna.resize(256, 256)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write("lena-small-bw.jpg"); // save
});
}

// go back to my photos page
  onBackButton(){
    this.navCtrl.push('MyPhotosPage')
  }
}
