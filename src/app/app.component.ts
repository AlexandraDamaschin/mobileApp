import { AuthProvider } from '../providers/auth/auth';
import { LoadingData } from '../models/common';
import { EventType, LoadingAction } from '../models/Enum';
import { FirebaseImagesProvider } from '../providers/firebase-images/firebase-images';
import { Component } from '@angular/core';
import { AlertController, Events, Loading, LoadingController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'TabsPage';
  private _loading: Loading;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _loadingCtrl: LoadingController, private _events: Events, private _alertCtrl: AlertController,
    private _auth: AuthProvider

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
    // setTimeout(() => {
    // });
    let alert = this._alertCtrl.create({
      title: "Error",
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();

    alert.onDidDismiss(() => {

    });
  }

}
