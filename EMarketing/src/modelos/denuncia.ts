import { Publicacao } from './publicacao';
import { Comentario } from './comentario';
import { Consumidor } from './consumidor';
export class Denuncia{

    idDenuncia:number;
    idPublicacao : number;
    idConsumidor : number;
    idComentario:number;
    mensagem :  string;
    dataDenuncia:string;


    publicacao : Publicacao;
    comentario : Comentario;
    consumidor : Consumidor;

}