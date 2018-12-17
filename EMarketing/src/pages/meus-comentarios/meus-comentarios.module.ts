import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusComentariosPage } from './meus-comentarios';

@NgModule({
  declarations: [
    MeusComentariosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusComentariosPage),
  ],
  entryComponents:[
    MeusComentariosPage
  ]
})
export class MeusComentariosPageModule {}
