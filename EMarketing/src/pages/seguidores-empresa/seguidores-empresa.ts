import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Consumidor } from '../../modelos/consumidor';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';



@IonicPage()
@Component({
  selector: 'page-seguidores-empresa',
  templateUrl: 'seguidores-empresa.html',
})
export class SeguidoresEmpresaPage {

  private API_URL = 'http://localhost:55409/api/Usuario/'
  public consumidores : Consumidor[];

  public usuario : Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuarioService : UsuariosServiceProvider,private _http : HttpClient) {

    this.usuario = new Usuario();

     this._http.get<Consumidor[]>(this.API_URL+'/MeusSeguidores/'+this.usuarioLogado.idUsuario)
                      .subscribe(
                      (consumidores) =>{
                      this.consumidores = consumidores;
                    }
                  );
  }
  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeguidoresEmpresaPage');
  }

}
