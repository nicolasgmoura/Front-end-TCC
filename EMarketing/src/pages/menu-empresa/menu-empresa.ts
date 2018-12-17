import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { DadosConsumidorPage } from '../dados-consumidor/dados-consumidor';
import { HomeConsumidorPage } from './../home-consumidor/home-consumidor';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { LoginPage } from '../login/login';
import { HomeEmpresaPage } from './../home-empresa/home-empresa';
import { DadosEmpresaPage } from './../dados-empresa/dados-empresa';
import { SeguidoresEmpresaPage } from '../seguidores-empresa/seguidores-empresa';
import { ComentariosRecebidosPage } from './../comentarios-recebidos/comentarios-recebidos';

@IonicPage()

@Component({
  
  selector: 'page-menu-empresa',
  templateUrl: 'menu-empresa.html',
})
export class MenuEmpresaPage {

  @ViewChild(Nav) public nav:Nav;
  
  rootPage:any = HomeEmpresaPage;

 public paginas = [
  { titulo  : 'Meus Dados ', componente : DadosEmpresaPage.name, icone : 'contact'},
  { titulo  : 'Meus Seguidores ', componente : SeguidoresEmpresaPage.name, icone : 'walk'},
  { titulo  : 'Comentários Recebidos ', componente : ComentariosRecebidosPage.name, icone : 'create'},
  { titulo  : 'Sair ', componente : LoginPage.name, icone : 'exit'}
 
]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _usuarioService : UsuariosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuConsumidorPage');
  }

  irParaPagina(componente){
    this.nav.push(componente);
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

}
