import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { HttpClientModule } from '@angular/common/http';
import { HomeConsumidorPage } from '../pages/home-consumidor/home-consumidor';
import { MenuConsumidorPage } from '../pages/menu-consumidor/menu-consumidor';
import 'rxjs/add/operator/do';
import { PublicacaoServiceProvider } from '../providers/publicacao-service/publicacao-service';
import { MenuEmpresaPage } from '../pages/menu-empresa/menu-empresa';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';

import {DatePicker} from '@ionic-native/date-picker';
import { AlterarConsumidorPage } from '../pages/alterar-consumidor/alterar-consumidor';
import { HomeEmpresaPage } from '../pages/home-empresa/home-empresa';
import { AlterarEmpresaPage } from '../pages/alterar-empresa/alterar-empresa';
import { PublicacaoPage } from '../pages/publicacao/publicacao';
import { AlteraPublicacaoPage } from '../pages/altera-publicacao/altera-publicacao';
import { MinhasEmpresasPage } from '../pages/minhas-empresas/minhas-empresas';
import { AlterarComentarioPage } from '../pages/alterar-comentario/alterar-comentario';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { LoginPageModule } from '../pages/login/login.module';
import { DenunciaPublicacaoPage } from '../pages/denuncia-publicacao/denuncia-publicacao';
import { AlterarDenunciaPage } from '../pages/alterar-denuncia/alterar-denuncia';
import { VerDadosEmpresaPage } from '../pages/ver-dados-empresa/ver-dados-empresa';
import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { EmpresasPage } from '../pages/empresas/empresas';
import { DenunciasPage } from '../pages/denuncias/denuncias';
import { ConsumidoresPage } from '../pages/consumidores/consumidores';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeConsumidorPage,
    MenuConsumidorPage, 
    MenuEmpresaPage,
    CadastroUsuarioPage, 
    AlterarConsumidorPage,
    AlterarEmpresaPage,
    HomeEmpresaPage,
    PublicacaoPage, 
    AlteraPublicacaoPage,
    AlterarComentarioPage, 
    RecuperarSenhaPage,
    DenunciaPublicacaoPage, 
    AlterarDenunciaPage,
    VerDadosEmpresaPage, 
    HomeAdministradorPage,
    EmpresasPage,
    DenunciasPage,
    ConsumidoresPage
  ],
  imports: [
  BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule, 
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeConsumidorPage,
    MenuConsumidorPage, 
    MenuEmpresaPage, 
    CadastroUsuarioPage,
    AlterarConsumidorPage,
    AlterarEmpresaPage,
    HomeEmpresaPage,
    PublicacaoPage,
    AlteraPublicacaoPage, 
    AlterarComentarioPage, 
    RecuperarSenhaPage,
    DenunciaPublicacaoPage,
    AlterarDenunciaPage, 
    VerDadosEmpresaPage,
    HomeAdministradorPage,
    EmpresasPage,
    DenunciasPage,
    ConsumidoresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosServiceProvider,
    PublicacaoServiceProvider, 
    DatePicker
  ], 
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
