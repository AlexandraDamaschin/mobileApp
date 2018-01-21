import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPhotosPage } from './my-photos';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhotosPage),
    PipesModule
  ],
})
export class MyPhotosPageModule {}
