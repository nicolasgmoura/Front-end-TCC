import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa } from '../../modelos/empresa';
import { HttpClient } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
})
export class EmpresasPage {
  private API_URL = 'http://localhost:55409/api/Usuario'

  quantidadeEmpresas: number;
  public empresas: Empresa[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient) {


    this._http.get<Empresa[]>(this.API_URL + '/Empresas')
      .subscribe(
        (empresas) => {
          this.empresas = empresas
          this.contarEmpresas();
        }
      );
      
  }

  contarEmpresas(){
    this.quantidadeEmpresas = 0;
    this.empresas.forEach(element => {
       this.quantidadeEmpresas++;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresasPage');
  }

}
