import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Denuncia } from '../../modelos/denuncia';
import { HomeAdministradorPage } from './../home-administrador/home-administrador';



@IonicPage()
@Component({
  selector: 'page-denuncias',
  templateUrl: 'denuncias.html',
})
export class DenunciasPage {

  private API_URL = 'http://localhost:55409/api/Denuncia'
  private API_URL2 = 'http://localhost:55409/api/Publicacao/'

  quantidadeDenuncias: number;
  public denuncias: Denuncia[];
  private _status : number = 1;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _http: HttpClient, private _alert : AlertController, 
     private _toast : ToastController, private _load : LoadingController) {


    this._http.get<Denuncia[]>(this.API_URL + '/Denuncias')
    .subscribe(
      (denuncias) => {
        this.denuncias = denuncias
        this.contarDenuncias();
      }
    );

  }
  contarDenuncias(){
    this.quantidadeDenuncias = 0;
    this.denuncias.forEach(element => {
       this.quantidadeDenuncias++;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DenunciasPage');
  }


  excluirPublicacao(idPublicacao) {

    let alert = this._alert.create({
      title: 'Deseja Realmente excluir a publicação referente a esta denúncia ?',
      subTitle: 'Todas as denúncias e comentários referentes a esta publicação serão excluídos.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL2+'DeletePublicacaoDenunciaComentario/'+idPublicacao
              return new Promise((resolve, reject) => {
                this._http.delete(url)
                .subscribe((result: any) => {

                this._load.create({ content: "excluindo publicacao", duration: 1000 }).present();
                this.toastMessage(result)
                this.navCtrl.setRoot(HomeAdministradorPage);

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

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

}
