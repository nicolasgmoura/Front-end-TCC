import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comentario } from '../../modelos/comentario';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { HttpClient } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-comentarios-recebidos',
  templateUrl: 'comentarios-recebidos.html',
})
export class ComentariosRecebidosPage {

  
  private API_URL = 'http://localhost:55409/api/Comentario'

  public comentarios : Comentario[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _usuarioService : UsuariosServiceProvider,  private _http : HttpClient) {

      
      this._http.get<Comentario[]>(this.API_URL+'/ComentariosRecebidos/'+this.usuarioLogado.idUsuario)
                  .subscribe(
                  (comentarios) =>{
                  this.comentarios = comentarios
                }
              );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariosRecebidosPage');
  }
  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }


}
