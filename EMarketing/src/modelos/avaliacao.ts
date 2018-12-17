import { Empresa } from "./empresa";
import { Consumidor } from './consumidor';

export class Avaliacao {

    idAvaliacao: number;
    idEmpresa: number;
    idConsumidor: number;
    quantidadeAvalicao: number;
    valorAvaliacao: number;
    dataAvaliacao: string;

    empresa : Empresa;
    consumidor : Consumidor
}