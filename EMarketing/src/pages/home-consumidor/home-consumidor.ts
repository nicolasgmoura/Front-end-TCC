import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { DadosConsumidorPage } from './../dados-consumidor/dados-consumidor';
import { Publicacao } from './../../modelos/publicacao';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Comentario } from '../../modelos/comentario';
import { convertDataToISO } from 'ionic-angular/umd/util/datetime-util';
import { DenunciaPublicacaoPage } from './../denuncia-publicacao/denuncia-publicacao';




@IonicPage()
@Component({
  selector: 'page-home-consumidor',
  templateUrl: 'home-consumidor.html',
})
export class HomeConsumidorPage {


  private API_URL = 'http://localhost:55409/api/Publicacao/'
  private API_URL2 = 'http://localhost:55409/api/Comentario/'

  public publicacoes : Publicacao[];
  public comentarios : Comentario[];
  private _status : number = 1;

  private invalidou : boolean = false;
  private comentario: Comentario = new Comentario();
  private _dataAtual : string;

  idConsumidor : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http : HttpClient, public loadingCtrl: LoadingController,
     private _usuarioService : UsuariosServiceProvider, private _toast : ToastController,
     private _alert : AlertController,private _load: LoadingController) {


    this._dataAtual = this.dataHoje();

    this.idConsumidor = this.usuarioLogado.idUsuario;

    this._http.get<Publicacao[]>(this.API_URL+'/VerPublicacao/'+this.usuarioLogado.idUsuario)
                      .subscribe(
                      (publicacoes) =>{
                      this.publicacoes = publicacoes
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeConsumidorPage');
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }

  dataHoje(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }


  comentar(publicacao : Publicacao) {

    this.comentario.idPublicacao = publicacao.idPublicacao;
    this.comentario.idUsuario = this.usuarioLogado.idUsuario;

    let url = this.API_URL2+'Create';

    if(this.comentario.descricao == ""){
      this.invalidou = true;
      this.alertMessage("Digite um comentário !!");
    }else{
      this.invalidou = false;
    }

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.post(url,this.comentario)
        .subscribe((result: any) => {
        this._load.create({ content: "Comentando...", duration: 1000 }).present();
        this.toastMessage(result)

        this.atualizaQuantidadeComentarios(publicacao);
        this.comentario.descricao="";
        
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível registrar seu comentário");
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

  atualizaQuantidadeComentarios(publicacao){

    this.publicacoes.forEach(element => {
      if(element.idPublicacao == publicacao.idPublicacao){
        element.quantidadeComentarios++;
      }
    });
  }

  denunciar(idPublicacao : number){
    this.navCtrl.push(DenunciaPublicacaoPage, {idPublicacaoSelecionada : idPublicacao});
  }
  }
