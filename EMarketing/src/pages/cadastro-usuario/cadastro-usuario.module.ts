import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUsuarioPage } from './cadastro-usuario';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CadastroUsuarioPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(CadastroUsuarioPage),
  ],
  exports:[
    CadastroUsuarioPage
  ],
  entryComponents:[
    CadastroUsuarioPage
  ],
})
export class CadastroUsuarioPageModule {}
