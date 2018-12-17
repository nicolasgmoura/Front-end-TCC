import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Publicacao } from './../../modelos/publicacao';
import { HttpClient } from '@angular/common/http';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { PublicacaoPage } from './../publicacao/publicacao';
import { AlteraPublicacaoPage } from './../altera-publicacao/altera-publicacao';


@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {


  private API_URL = 'http://localhost:55409/api/Publicacao/'

  public publicacoes : Publicacao[];
  idConsumidor : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http : HttpClient, public loadingCtrl: LoadingController,
      private _usuarioService : UsuariosServiceProvider) {

    
    this.idConsumidor = this.usuarioLogado.idUsuario;

    this._http.get<Publicacao[]>(this.API_URL+'/MinhasPublicacoes/'+this.usuarioLogado.idUsuario)
                      .subscribe(
                      (publicacoes) =>{
                      this.publicacoes = publicacoes
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeConsumidorPage');
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

  publicar(){
    this.navCtrl.push(PublicacaoPage);
  }

  alteraPublicacao(publicacao : Publicacao){

    this.navCtrl.push(AlteraPublicacaoPage, {publicacaoSelecionada : publicacao})
  }

  }
