import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuConsumidorPage } from './menu-consumidor';
import { HomeConsumidorPage } from '../home-consumidor/home-consumidor';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MenuConsumidorPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuConsumidorPage),
    BrowserModule, 
  ],
  entryComponents : [
    MenuConsumidorPage,
  ],
})
export class MenuConsumidorPageModule {}
