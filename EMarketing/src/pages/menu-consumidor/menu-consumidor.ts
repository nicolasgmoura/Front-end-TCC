import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { DadosConsumidorPage } from '../dados-consumidor/dados-consumidor';
import { HomeConsumidorPage } from './../home-consumidor/home-consumidor';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { LoginPage } from '../login/login';
import { MinhasEmpresasPage } from './../minhas-empresas/minhas-empresas';
import { EmpresasDestaquePage } from './../empresas-destaque/empresas-destaque';
import { MeusComentariosPage } from './../meus-comentarios/meus-comentarios';
import { MinhasDenunciasPage } from '../minhas-denuncias/minhas-denuncias';

@IonicPage()

@Component({
  
  selector: 'page-menu-consumidor',
  templateUrl: 'menu-consumidor.html',
})
export class MenuConsumidorPage {

  @ViewChild(Nav) public nav:Nav;
  
  rootPage:any = HomeConsumidorPage;

 public paginas = [
  { titulo  : 'Meus Dados ', componente : DadosConsumidorPage.name, icone : 'contact'},
  { titulo  : 'Empresas Destaque ', componente : EmpresasDestaquePage.name, icone : 'podium'},
  { titulo  : 'Minhas empresas ', componente : MinhasEmpresasPage.name, icone : 'thumbs-up'},
  { titulo  : 'Meus comentários ', componente : MeusComentariosPage.name, icone : 'chatboxes'},
  { titulo  : 'Minhas denúncias ', componente : MinhasDenunciasPage.name, icone : 'megaphone'},
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
