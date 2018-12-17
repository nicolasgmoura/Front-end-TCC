import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarConsumidorPage } from './alterar-consumidor';

@NgModule({
  declarations: [
    AlterarConsumidorPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarConsumidorPage),
  ],
  entryComponents:[
    AlterarConsumidorPage
  ]
})
export class AlterarConsumidorPageModule {}
