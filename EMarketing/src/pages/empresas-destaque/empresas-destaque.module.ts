import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresasDestaquePage } from './empresas-destaque';
import { FiltrarEmpresaPipe } from '../../pipes/filtrar-empresa/filtrar-empresa';

@NgModule({
  declarations: [
    EmpresasDestaquePage,
    FiltrarEmpresaPipe
  ],
  imports: [
    IonicPageModule.forChild(EmpresasDestaquePage),
  ],
  exports:[
    EmpresasDestaquePage
  ]

})
export class EmpresasDestaquePageModule {}
