import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariosRecebidosPage } from './comentarios-recebidos';

@NgModule({
  declarations: [
    ComentariosRecebidosPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariosRecebidosPage),
  ],
  entryComponents:[
    ComentariosRecebidosPage
  ], 
  exports:[
    ComentariosRecebidosPage
  ]
})
export class ComentariosRecebidosPageModule {}
