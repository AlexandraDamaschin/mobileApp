import { HttpClientModule } from '@angular/common/http';
import { FirebaseImagesProvider } from '../providers/firebase-images/firebase-images';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FireDbProvider } from '../providers/fire-db/fire-db';

import { GoogleMaps } from '../providers/google-maps/google-maps';
import { ConnectivityService } from '../providers/connectivity/connectivity';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { NotificationProvider } from '../providers/notification/notification';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserDetailsService } from '../providers/user-details/user-details';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseImagesProvider,
    AuthProvider,
    FireDbProvider,
    UserDetailsService,
    GoogleMaps,
    ConnectivityService,
    Network,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationProvider,
    SocialSharing
    
  ]
})
export class AppModule {}
