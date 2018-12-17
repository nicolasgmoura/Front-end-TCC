import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumidoresPage } from './consumidores';

@NgModule({
  declarations: [
    ConsumidoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumidoresPage),
  ],
})
export class ConsumidoresPageModule {}
