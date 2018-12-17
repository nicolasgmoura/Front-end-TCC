import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresasPage } from './empresas';

@NgModule({
  declarations: [
    EmpresasPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresasPage),
  ],
})
export class EmpresasPageModule {}
