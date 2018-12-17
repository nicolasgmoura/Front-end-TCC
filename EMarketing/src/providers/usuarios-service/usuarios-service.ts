import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';


@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado : Usuario;

  private _mensagemRequisicao : string;

  private _status : number;

  private _cadastrou : boolean = false;
  
  private API_URL = 'http://localhost:55409/api/Usuario/' 

  constructor(private http: HttpClient) {
    console.log('Hello UsuariosServiceProvider Provider');
  }

  efetuaLogin(_usuarioInformado){
    let url = this.API_URL + 'Logar';
    return this.http.post<Usuario>(url,_usuarioInformado)
                    .do((usuario : Usuario) => this._usuarioLogado = usuario);
  }


  cadastraUsuario(usuario: Usuario){
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL+'Create';

      this.http.post(url,usuario)
     .subscribe((result: any) => {
      this._mensagemRequisicao = result;
      },
      (respostaRequisicao : HttpErrorResponse)=> {
        this._status = respostaRequisicao.status;
      })
    }); 
  }


  obtemUsuarioLogado(){
    return this._usuarioLogado;
  }

  obtemMensagemRequisicao(){
    return this._mensagemRequisicao;
  }

  obtemStatusText(){

    if(this._status == 0){
      return "Sem comunicação com Servidor !"
    }else if(this._status == 500){
      return "Erro interno no Servidor !"
    }else if(this._status == 400){
      return "Não foi possível cadastrar o Usuário !"
    }else{
      this._cadastrou = true;
      return this.obtemMensagemRequisicao();
    }

  }

  cadastrou(){
    return this._cadastrou;
  }

}
