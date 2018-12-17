import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosEmpresaPage } from './dados-empresa';

@NgModule({
  declarations: [
    DadosEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(DadosEmpresaPage),
  ],
})
export class DadosEmpresaPageModule {}
