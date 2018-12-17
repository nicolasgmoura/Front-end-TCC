import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeguidoresEmpresaPage } from './seguidores-empresa';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SeguidoresEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(SeguidoresEmpresaPage),
  ],
  entryComponents : [
    SeguidoresEmpresaPage
  ],
  exports:[
    SeguidoresEmpresaPage
  ]
})
export class SeguidoresEmpresaPageModule {}
