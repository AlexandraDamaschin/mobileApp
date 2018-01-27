import { EventType, MapAction } from '../../models/Enum';
import { ConnectivityService } from '../connectivity/connectivity';
import { ElementRef, Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { MapEvent } from '../../models/common';
import { Platform, Events } from 'ionic-angular';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler/src/ml_parser/interpolation_config';
import { NotificationProvider } from '../notification/notification';

declare var google;
const DEFAULT_ZOOM = 7;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyDL_h4Q3HL5CwDFJrGOzztLY5tBbcldPuk";
  private _currentZoom: number;

  constructor(public connectivityService: ConnectivityService, public geolocation: Geolocation, private _notification: NotificationProvider) {
    this._currentZoom = DEFAULT_ZOOM;
  }

  init(mapElement: ElementRef, pleaseConnect: ElementRef): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=visualization,places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
        resolve(true);
      }
      this.addConnectivityListeners();
    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;
    return new Promise((resolve) => {
      // this.geolocation.getCurrentPosition().then((position) => {
      let lat = 53.4374523;
      let lng = -8.0369021;
      let latLng = new google.maps.LatLng(lat, lng);
      let cz = this._currentZoom;

      let mapOptions = {
        center: latLng,
        zoom: DEFAULT_ZOOM,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: 'greedy',
        // zoomControl: false
      }
      this.map = new google.maps.Map(this.mapElement, mapOptions);
      // this.addCenterPin(latLng);
      // this.createCenterIcon();
      this.map.addListener('zoom_changed', () => {
        this.notifyZoomChanged();
      });
      resolve(true);
      // });
    });
  }

  notifyZoomChanged() {
    let newZoomLevel = this.map.getZoom();
    let n = new MapEvent(MapAction.zoomChanged);
    n.newZoom = newZoomLevel;
    n.oldZoom = this._currentZoom;
    this._notification.notify(EventType.map, n);
    this._currentZoom = newZoomLevel;
  }

  addCenterPin(latLng) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });
  }
  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  addPinToMap(pos, animation, icon) {
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      animation: animation,
      icon: icon
    });
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    });

    this.connectivityService.watchOffline().subscribe(() => {
      this.disableMap();
    });

  }

  createCenterIcon() {
    // Create a div to hold the control.
    var controlDiv = document.createElement('div');

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center Map';
    controlUI.appendChild(controlText);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }

}
