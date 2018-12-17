import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Denuncia } from '../../modelos/denuncia';
import { HttpClient } from '@angular/common/http';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { AlterarDenunciaPage } from './../alterar-denuncia/alterar-denuncia';



@IonicPage()
@Component({
  selector: 'page-minhas-denuncias',
  templateUrl: 'minhas-denuncias.html',
})
export class MinhasDenunciasPage {

  public denuncias : Denuncia[];

  private API_URL = 'http://localhost:55409/api/Denuncia'


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _http : HttpClient, private _usuarioService : UsuariosServiceProvider) {

    this._http.get<Denuncia[]>(this.API_URL+'/MinhasDenuncias/'+this.usuarioLogado.idUsuario)
                  .subscribe(
                  (denuncias) =>{
                  this.denuncias = denuncias
                }
              );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasDenunciasPage');
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }


  alterarDenuncia(denuncia : Denuncia){
    this.navCtrl.push(AlterarDenunciaPage, {denunciaSelecionada : denuncia});
  }
}
