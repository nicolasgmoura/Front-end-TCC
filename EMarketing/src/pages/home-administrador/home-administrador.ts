import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa } from '../../modelos/empresa';
import { HttpClient } from '@angular/common/http';
import { EmpresasPage } from '../empresas/empresas';
import { LoginPage } from './../login/login';
import { DenunciasPage } from '../denuncias/denuncias';
import { ConsumidoresPage } from './../consumidores/consumidores';


@IonicPage()
@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html',
})
export class HomeAdministradorPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministradorPage');
  }

  irParaListaEmpresas(){
    this.navCtrl.push(EmpresasPage)
  }

  irParaListaDenuncias(){
    this.navCtrl.push(DenunciasPage)
  }

  irParaListaConsumidores(){
    this.navCtrl.push(ConsumidoresPage)
  }

  sair(){
    this.navCtrl.setRoot(LoginPage)
  }
}
