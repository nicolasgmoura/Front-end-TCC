import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuEmpresaPage } from './menu-empresa';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    MenuEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuEmpresaPage),
    BrowserModule,
  ],
  entryComponents : [
    MenuEmpresaPage,
  ]
})
export class MenuEmpresaPageModule {}
