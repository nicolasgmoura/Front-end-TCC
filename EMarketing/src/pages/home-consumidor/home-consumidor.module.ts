import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeConsumidorPage } from './home-consumidor';
import { MenuConsumidorPage } from '../menu-consumidor/menu-consumidor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    HomeConsumidorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeConsumidorPage),
  ],
  entryComponents :[
    HomeConsumidorPage,
  ],
})
export class HomeConsumidorPageModule {}
