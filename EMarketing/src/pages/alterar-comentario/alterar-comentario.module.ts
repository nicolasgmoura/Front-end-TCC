import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarComentarioPage } from './alterar-comentario';

@NgModule({
  declarations: [
    AlterarComentarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarComentarioPage),
  ]
})
export class AlterarComentarioPageModule {}
