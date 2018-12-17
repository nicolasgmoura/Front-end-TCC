import { Img } from "ionic-angular/umd/components/img/img-interface";
import { Segmento } from './segmento';

export class Empresa{
    idEmpresa : number;
    idSegmento : number;
    cnpj : string;
    razaoSocial : string;
    fantasia : string;
    endereco : string;
    numero : number;
    bairro : string;
    cep : string;
    telefone : string;
    logo : string;
    quantidadeSeguidores : number
    quantidadeAvaliacao : number
    mediaAvaliacao : number;


    segmento : Segmento;
}