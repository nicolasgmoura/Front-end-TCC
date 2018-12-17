import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Denuncia } from '../../modelos/denuncia';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeConsumidorPage } from '../home-consumidor/home-consumidor';


@IonicPage()
@Component({
  selector: 'page-alterar-denuncia',
  templateUrl: 'alterar-denuncia.html',
})
export class AlterarDenunciaPage {

  private _status : number = 1;
  private invalidou : boolean = false;
  private API_URL = 'http://localhost:55409/api/Denuncia/'

  denuncia : Denuncia;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _http : HttpClient, private _load : LoadingController, 
    private _alert : AlertController, private _toast : ToastController) {

    this.denuncia = new Denuncia();

    this.denuncia = this.navParams.get("denunciaSelecionada")

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarDenunciaPage');
  }


  alterarDenuncia(){

    if(this.denuncia.mensagem == ""){
      this.toastMessage("Digite uma mensagem !")
      this.invalidou = true;
    }else{
      this.invalidou = false;
    }

    let url = this.API_URL+'/Change/'+this.denuncia.idDenuncia;
    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.put(url,this.denuncia)
        .subscribe((result: any) => {
        this._load.create({ content: "Alterando sua denúncia", duration: 1000 }).present();
        this.toastMessage(result)
        this.navCtrl.setRoot(HomeConsumidorPage);
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível alterar sua denúncia");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }
        })
      }); 
    }
  }

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

  excluirDenuncia() {

    let alert = this._alert.create({
      title: 'Deseja Realmente excluir esta denúncia ?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL+'Delete/'+this.denuncia.idDenuncia
              return new Promise((resolve, reject) => {
                this._http.delete(url)
                .subscribe((result: any) => {

                this._load.create({ content: "excluindo denúncia", duration: 1000 }).present();
                this.toastMessage(result)
                this.navCtrl.setRoot(HomeConsumidorPage);

                },
                (resposta : HttpErrorResponse)=> {
                  this._status = resposta.status;
                  if(resposta.status == 0){
                    this.toastMessage("Sem comunicação com o servidor !");
                  }else if(resposta.status == 400){
                    this.toastMessage("Não foi possível excluir publicação");
                  }else if(resposta.status == 500){
                    this.toastMessage("Erro interno no servidor");
                  }
                })
              }); 
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        }
      ]
    });
    alert.present();
  }



}
