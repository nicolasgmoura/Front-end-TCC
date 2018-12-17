import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { AlterarConsumidorPage } from './../alterar-consumidor/alterar-consumidor';
import { Consumidor } from './../../modelos/consumidor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { Empresa } from './../../modelos/empresa';
import { AlterarEmpresaPage } from './../alterar-empresa/alterar-empresa';

@IonicPage()
@Component({
  selector: 'page-dados-empresa',
  templateUrl: 'dados-empresa.html',
})
export class DadosEmpresaPage {

  empresa : Empresa;

  private API_URL = 'http://localhost:55409/api/'
  private _status : number = 1;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuarioService : UsuariosServiceProvider, private _http : HttpClient, 
    private _toast : ToastController, private _load : LoadingController, private _alert : AlertController) {

  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

  desativarConta() {

    let alert = this._alert.create({
      title: 'Deseja Realmente desativar sua conta ?',
      message: 'Ao desativar você não poderá mais acessá-la',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL+'Usuario/Delete/'+this.usuarioLogado.idUsuario
              return new Promise((resolve, reject) => {
                this._http.delete(url)
                .subscribe((result: any) => {

                this._load.create({ content: "Desativando conta", duration: 1000 }).present();
                this.toastMessage(result)
                this.navCtrl.setRoot(LoginPage);
                },
                (resposta : HttpErrorResponse)=> {
                  this._status = resposta.status;
                  if(resposta.status == 0){
                    this.toastMessage("Sem comunicação com o servidor !");
                  }else if(resposta.status == 400){
                    this.toastMessage("Não foi possível desativar conta");
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DadosConsumidorPage');
  }

  irPaginaAlterar(){
    this.navCtrl.push(AlterarEmpresaPage)
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
