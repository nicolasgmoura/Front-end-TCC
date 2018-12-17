import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Consumidor } from './../../modelos/consumidor';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-consumidores',
  templateUrl: 'consumidores.html',
})
export class ConsumidoresPage {


  private API_URL = 'http://localhost:55409/api/Usuario'

  quantidadeConsumidores: number;
  public consumidores: Consumidor[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient) {


    this._http.get<Consumidor[]>(this.API_URL + '/Consumidores')
      .subscribe(
        (consumidores) => {
          this.consumidores = consumidores
          this.contarConsumidores();
        }
      );
      
  }

  contarConsumidores(){
    this.quantidadeConsumidores = 0;
    this.consumidores.forEach(element => {
       this.quantidadeConsumidores++;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumidoresPage');
  }

}
