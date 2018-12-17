import { Pipe, PipeTransform } from '@angular/core';
import { Empresa } from '../../modelos/empresa';

@Pipe({
  name: 'filtrarEmpresa',
})
export class FiltrarEmpresaPipe implements PipeTransform {
  
  transform(empresas:Empresa[] ,value: string ) {
   
    if(!value) return empresas;

    return empresas.filter((empresa)=>{ return empresa.segmento.descricao.toLowerCase().includes(value.toLowerCase())})
  }
}
