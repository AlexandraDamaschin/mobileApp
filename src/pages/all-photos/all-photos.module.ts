import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPhotosPage } from './all-photos';

@NgModule({
  declarations: [
    AllPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPhotosPage),
  ],
})
export class AllPhotosPageModule {}
