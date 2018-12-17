import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicacaoPage } from './publicacao';

@NgModule({
  declarations: [
    PublicacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicacaoPage),
  ],

  exports:[
    PublicacaoPage
  ]
})
export class PublicacaoPageModule {}
