import { Publicacao } from "./publicacao";
import { Usuario } from "./usuario";

export class Comentario{
    idComentario : number;
    idPublicacao : number;
    idUsuario : number
    descricao : string;
    idResposta : number;
    dataComentario : string;
    
    resposta : Comentario;
    publicacao : Publicacao;
    usuario : Usuario;


}