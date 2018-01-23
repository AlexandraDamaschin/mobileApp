import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
//import { Camera } from '@ionic-native/camera';
//import { Platform, ActionSheetController, LoadingController } from 'ionic-angular';

declare var fx;

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage {

//  @ViewChild('imageResult') private imageResult: ElementRef; // reference to DOM element
@ViewChild('image') image;
    // smileHeight: number = 250;
    // image : any
  //image: string = '../assets/imgs/migrations.png';
  // _zone: any;

   brightness: number = 12;
   contrast: number = 52;
  // unsharpMask: any = { radius: 100, strength: 2 };
  // hue: number = -100;
  // saturation: number = -100;

  // showEditFilters: boolean = false;

  constructor(
    public navCtrl: NavController,
    // public camera: Camera,
    // public platform: Platform,
    // public loadingCtrl: LoadingController,
    // public actionsheetCtrl: ActionSheetController
  ) {
   // this._zone = new NgZone({ enableLongStackTrace: false });
  }

  

  ionViewDidLoad() {
    let c: any;
    c = document.getElementById("image2");
    var ctx = c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
  }

  /// Execute a menu 
  // openMenu() {
  //   let actionSheet;
  //   if (this.image) {
  //     actionSheet = this.actionsheetCtrl.create({
  //       title: 'Actions',
  //       cssClass: 'action-sheets-basic-page',
  //       buttons: [
  //         {
  //           text: 'Apply filters',
  //           icon: !this.platform.is('ios') ? 'barcode' : null,
  //           handler: () => {
  //             this.filter(this.imageResult.nativeElement.src)
  //           }
  //         },
  //         {
  //           text: 'Clean filters',
  //           icon: !this.platform.is('ios') ? 'refresh' : null,
  //           handler: () => {
  //             this.restoreImage()
  //           }
  //         },
  //         {
  //           text: this.showEditFilters == false ? 'Customize filters' : 'Hide customization filters',
  //           icon: !this.platform.is('ios') ? 'hammer' : null,
  //           handler: () => {
  //             this.showEditFilters = this.showEditFilters == false ? true : false;
  //           }
  //         },
  //         {
  //           text: 'Cancel',
  //           role: 'cancel', // will always sort to be on the bottom
  //           icon: !this.platform.is('ios') ? 'close' : null,
  //           handler: () => {
  //             console.log('Cancel clicked');
  //           }
  //         }
  //       ]
  //     });
  //   }
  //   actionSheet.present();
  // }

  // restoreImage() {
  //   if (this.image) {
  //     this.imageResult.nativeElement.src = this.image;
  //   }
  // }

  canvas1() {
    console.log('canvas called.....');
  }

 filter(image) {
  let canvas: any;
  c = document.getElementById("image");
  console.log('filter called.....');
  //   /// Initialization of glfx.js
  //   /// is important, to use js memory elements
  //   /// access to Window element through (<any>window)
  //   try {

      var c = fx.canvas();
   //   var image = document.getElementById('image');
      var texture = c.texture(image);
  //   } catch (e) {
  //     alert(e);
  //     return;
  //   }

  //  /// taken from glfx documentation
 var imageElem = this.image; // another trick is acces to DOM element
  //   //convert imageElem to a texture
     var texture = c.texture(imageElem);

  //   /// filters applied to clean text
    c.draw(texture)
  //     .hueSaturation(this.hue / 100, this.saturation / 100)//grayscale
  //     .unsharpMask(this.unsharpMask.radius, this.unsharpMask.strength)
       .brightnessContrast(this.brightness / 100, this.contrast / 100)
  //     .update();
  }

  // takePicture() {
  //   let loader = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loader.present();

  //   // Take a picture saving in device, as jpg and allows edit
  //   this.camera.getPicture({
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.NATIVE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetHeight: 1000,
  //     sourceType: 1,
  //     allowEdit: true,
  //     saveToPhotoAlbum: true,
  //     correctOrientation: true
  //   }).then((imageURI) => {
  //     loader.dismissAll();

  //     // bind the URI returned by API
  //     this.image = imageURI;

  //   }, (err) => {
  //     console.log(`ERROR -> ${JSON.stringify(err)}`);
  //   });
  // }

  // go back to my photos page
  onBackButton() {
    this.navCtrl.push('MyPhotosPage')
  }
}
