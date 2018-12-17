import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './../../modelos/usuario';
import { Publicacao } from './../../modelos/publicacao';


@Injectable()
export class PublicacaoServiceProvider {

  private API_URL = 'http://localhost:55409/api/Publicacao/'

  public publicacoes : Publicacao[];


  private _usuarioLogado : Usuario;

  

  constructor(public _http: HttpClient) {
    console.log('Hello PublicacaoServiceProvider Provider');

    this._http.get<Publicacao[]>(this.API_URL+this._usuarioLogado.idUsuario)
                    .subscribe(
                      (publicacoes) =>{
                        this.publicacoes = publicacoes
                      }
                    );

  }

  listaTodasPublicaoes(IdUsuario : number){


  }



}
