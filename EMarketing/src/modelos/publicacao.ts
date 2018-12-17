import { Usuario } from "./usuario";

export class Publicacao{
    idPublicacao : number;
    idUsuario : number;
    imagemPublicacao : string; 
    dataPublicacao : string;
    titulo : string;
    areaPublicacao : string;
    quantidadeComentarios : number;
    quantidadeDenuncias :  number;
    quantidadeVisualizacoes : number;

    usuario : Usuario;

}