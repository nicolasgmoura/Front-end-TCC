import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosConsumidorPage } from './dados-consumidor';

@NgModule({
  declarations: [
    DadosConsumidorPage,
  ],
  imports: [
    IonicPageModule.forChild(DadosConsumidorPage),
  ],

  exports :[

    DadosConsumidorPage
  ]
})
export class DadosConsumidorPageModule {}
