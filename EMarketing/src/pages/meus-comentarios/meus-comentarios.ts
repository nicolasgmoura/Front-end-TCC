import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comentario } from './../../modelos/comentario';
import { AlterarComentarioPage } from './../alterar-comentario/alterar-comentario';


@IonicPage()
@Component({
  selector: 'page-meus-comentarios',
  templateUrl: 'meus-comentarios.html',
})
export class MeusComentariosPage {


  private API_URL = 'http://localhost:55409/api/Comentario'

  public comentarios : Comentario[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _usuarioService : UsuariosServiceProvider,  private _http : HttpClient) {

      
      this._http.get<Comentario[]>(this.API_URL+'/MeusComentarios/'+this.usuarioLogado.idUsuario)
                  .subscribe(
                  (comentarios) =>{
                  this.comentarios = comentarios
                }
              );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusComentariosPage');
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

  alterarComentario(comentario : Comentario){
    this.navCtrl.push(AlterarComentarioPage,{comentarioSelecionado : comentario})
  }

}
