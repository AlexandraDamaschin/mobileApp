import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'MyPhotosPage';
  tab2Root = 'AboutPage';
  tab3Root = 'ContactPage';

  constructor() {

  }
}
