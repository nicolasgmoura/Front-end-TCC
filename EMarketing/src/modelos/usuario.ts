import { Cidade } from './cidade';
import { Consumidor } from './consumidor';
import { Empresa } from './empresa';

export class Usuario{
    idUsuario : number;
    nomeUsuario : string;
    senha : string;
    email: string;
    isEmpresa: Boolean;
    isAdmin: Boolean;
    idCidade: Number;
    
    cidade : Cidade;
    consumidor: Consumidor;
    empresa : Empresa;
}
