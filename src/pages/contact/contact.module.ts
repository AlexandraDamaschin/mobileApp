import { ContactPage } from './contact';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
  ],
  exports:[
    ContactPage
  ]
})
export class ContactPageModule {}
