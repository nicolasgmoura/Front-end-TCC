import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Publicacao } from '../../modelos/publicacao';
import { Denuncia } from '../../modelos/denuncia';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Usuario } from './../../modelos/usuario';


@IonicPage()
@Component({
  selector: 'page-denuncia-publicacao',
  templateUrl: 'denuncia-publicacao.html',
})
export class DenunciaPublicacaoPage {

  idPublicacao : number;
  denuncia : Denuncia;
  usuario : Usuario;
  private _status : number = 1;
  private _dataAtual : string;
  private invalidou : boolean = false;
  private API_URL = 'http://localhost:55409/api/Denuncia/'


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _toast : ToastController,
    private _alert : AlertController,private _load: LoadingController, 
     private _http : HttpClient, private usuarioService : UsuariosServiceProvider) {

    this.denuncia = new Denuncia();
    this._dataAtual = this.dataHoje();
    
    this.usuario = new Usuario();

    this.usuario = this.usuarioService.obtemUsuarioLogado();

    this.idPublicacao = this.navParams.get("idPublicacaoSelecionada");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DenunciaPublicacaoPage');
  }


  denunciar() {

    this.denuncia.idPublicacao = this.idPublicacao;
    
    this.denuncia.idConsumidor = this.usuario.idUsuario;

    let url = this.API_URL+'Create';

    if(this.denuncia.mensagem == ""){
      this.invalidou = true;
      this.alertMessage("Digite a sua denúncia !");
    }else{
      this.invalidou = false;
    }

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.post(url,this.denuncia)
        .subscribe((result: any) => {
        this._load.create({ content: "Denunciando...", duration: 1000 }).present();
        this.toastMessage(result)

        this.denuncia.mensagem="";
        
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível realizar sua denúncia");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }

        })
      }); 
    }
  }

  alertMessage(mensagem: string) {

    return this._alert.create({
      title: "Aviso",
      message: mensagem,
      buttons: ["OK"]
    }).present();
  }

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

  dataHoje(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }

}
