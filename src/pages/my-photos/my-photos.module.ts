import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPhotosPage } from './my-photos';

@NgModule({
  declarations: [
    MyPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhotosPage),
  ],
})
export class MyPhotosPageModule {}
