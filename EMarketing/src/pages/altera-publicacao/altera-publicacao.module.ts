import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlteraPublicacaoPage } from './altera-publicacao';

@NgModule({
  declarations: [
    AlteraPublicacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlteraPublicacaoPage),
  ],
  entryComponents:[
    AlteraPublicacaoPage
  ]
})
export class AlteraPublicacaoPageModule {}
