import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    
  ],
  entryComponents : [
    CadastroUsuarioPage,
  ],
  exports :[
    LoginPage
  ],


})
export class LoginPageModule {}
