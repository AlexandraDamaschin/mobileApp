import { AuthProvider } from '../providers/auth/auth';
import { LoadingData } from '../models/common';
import { EventType, LoadingAction } from '../models/Enum';
import { FirebaseImagesProvider } from '../providers/firebase-images/firebase-images';
import { Component } from '@angular/core';
import { AlertController, Events, Loading, LoadingController, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'TabsPage';
  private _loading: Loading;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _toastCtrl: ToastController,
    private _loadingCtrl: LoadingController, private _events: Events, private _alertCtrl: AlertController,
    private _auth: AuthProvider //Need to inject this so its instantiated before the app loads

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this._events.subscribe(EventType.loading, (data: LoadingData) => {
      this.manageLoadingDialog(data);
    });

    this._events.subscribe(EventType.error, (error) => {
      this.showError(error);
    });

    this._events.subscribe(EventType.navigate, (data) => {
      // this._navCtrl.setRoot(data.page);
      this.rootPage = data.page;
    });

    this._events.subscribe(EventType.toast, (data) => {
      this.displayToast(data.msg);
    })
  }

  manageLoadingDialog(data: LoadingData) {
    switch (data.action) {
      case LoadingAction.show:
        this.showLoading(data.message);
        break;
      case LoadingAction.hide:
        this.hideLoading();
        break;
      case LoadingAction.hideAll:
        this.hideAllLoading();
        break;
    }
  }

  //loading dialog box
  showLoading(message?: string) {
    this._loading = this._loadingCtrl.create({
      content: message ? message : ""
    });
    this._loading.present();
  }

  hideAllLoading() {
    if (this._loading != null) {
      this._loading.dismissAll();
      this._loading = null;
    }
  }

  hideLoading() {
    if (this._loading != null) {
      this._loading.dismiss();
      this._loading = null;
    }
  }

  showError(error) {
    this.hideAllLoading();
    let alert = this._alertCtrl.create({
      title: error.title,
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();

    alert.onDidDismiss(() => {

    });
  }

  displayToast(msg: string, duration = 3000){
    let toast = this._toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }

}
