import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasEmpresasPage } from './minhas-empresas';

@NgModule({
  declarations: [
    MinhasEmpresasPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasEmpresasPage),
  ],
  exports:[
    MinhasEmpresasPage
  ]
})
export class MinhasEmpresasPageModule {}
