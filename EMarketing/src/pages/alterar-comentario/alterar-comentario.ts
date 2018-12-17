import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Comentario } from './../../modelos/comentario';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HomeConsumidorPage } from './../home-consumidor/home-consumidor';


@IonicPage()
@Component({
  selector: 'page-alterar-comentario',
  templateUrl: 'alterar-comentario.html',
})
export class AlterarComentarioPage {

  comentario : Comentario;
  private _status : number = 1;
  private invalidou : boolean = false;
  private API_URL = 'http://localhost:55409/api/Comentario/'

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _http : HttpClient, private _load : LoadingController, 
    private _alert : AlertController, private _toast : ToastController) {

    this.comentario = this.navParams.get("comentarioSelecionado");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarComentarioPage');
  }


  alterarComentario(){

    if(this.comentario.descricao == ""){
      this.toastMessage("Digite um comentário !");
      this.invalidou = true;
    }else{
      this.invalidou = false;
    }

    let url = this.API_URL+'/Change/'+this.comentario.idComentario;
    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.put(url,this.comentario)
        .subscribe((result: any) => {
        this._load.create({ content: "Alterando seu comentário", duration: 1000 }).present();
        this.toastMessage(result)
        this.navCtrl.setRoot(HomeConsumidorPage);
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível alterar comentário");
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

  excluirComentario() {

    let alert = this._alert.create({
      title: 'Deseja Realmente excluir este comentário ?',
      message: 'Ao excluir as empresas não poderão mais vê-lo',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL+'Delete/'+this.comentario.idComentario
              return new Promise((resolve, reject) => {
                this._http.delete(url)
                .subscribe((result: any) => {

                this._load.create({ content: "excluindo comentário", duration: 1000 }).present();
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
