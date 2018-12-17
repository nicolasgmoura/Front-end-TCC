import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa } from '../../modelos/empresa';



@IonicPage()
@Component({
  selector: 'page-ver-dados-empresa',
  templateUrl: 'ver-dados-empresa.html',
})
export class VerDadosEmpresaPage {

  empresa : Empresa;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.empresa = new Empresa();
    
    this.empresa = this.navParams.get("empresaSelecionada")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDadosEmpresaPage');
  }

}
