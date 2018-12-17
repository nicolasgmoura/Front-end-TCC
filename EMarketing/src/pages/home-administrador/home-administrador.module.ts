import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeAdministradorPage } from './home-administrador';

@NgModule({
  declarations: [
    HomeAdministradorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeAdministradorPage),
  ],
})
export class HomeAdministradorPageModule {}
