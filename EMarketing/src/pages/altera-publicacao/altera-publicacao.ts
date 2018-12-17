import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Publicacao } from './../../modelos/publicacao';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HomeEmpresaPage } from './../home-empresa/home-empresa';

@IonicPage()
@Component({
  selector: 'page-altera-publicacao',
  templateUrl: 'altera-publicacao.html',
})
export class AlteraPublicacaoPage {

  publicacao : Publicacao;

  private API_URL = 'http://localhost:55409/api/'

  private selecionouImagem = false;
  private _status : number = 1;

  private invalidou : boolean = false;

  form: FormGroup;
  text;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _toast : ToastController,
    private _http : HttpClient, private _load : LoadingController, private _alert : AlertController
  ) {

    this.publicacao = this.navParams.get("publicacaoSelecionada");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlteraPublicacaoPage');
    this.form = new FormGroup({
      logo: new FormControl('')
    })
  }

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

  validaPublicacao(){
    if(this.publicacao.titulo == ""){
      this.invalidou = true;
      return "Informe o título da publicação !"
    }
    if(this.publicacao.areaPublicacao == ""){
      this.invalidou = true;
      return "Informe o corpo da publicação !";
    }
  }

  onFileChange(event) {

    this.selecionouImagem = true;
    console.log(event);
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('logo').setValue({
          value: reader.result.toString().split(',')[1]
        })

      }
    }
  }

  excluirPublicacao() {

    let alert = this._alert.create({
      title: 'Deseja Realmente excluir esta publicação ?',
      message: 'Ao excluir seus seguidores não poderão mais vê-la',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL+'Publicacao/Delete/'+this.publicacao.idPublicacao
              return new Promise((resolve, reject) => {
                this._http.delete(url)
                .subscribe((result: any) => {

                this._load.create({ content: "excluindo publicação", duration: 1000 }).present();
                this.toastMessage(result)
                this.navCtrl.setRoot(HomeEmpresaPage);
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


  alterarPublicacao() {

    if(this.selecionouImagem == true){

      let path =  this.form.get('logo').value;
      this.publicacao.imagemPublicacao = path.value;
    }
   
    let url = this.API_URL+'Publicacao/Change/'+this.publicacao.idPublicacao

    this.toastMessage(this.validaPublicacao()); 

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.put(url,this.publicacao)
        .subscribe((result: any) => {
        this._load.create({ content: "Fazendo requisição", duration: 1000 }).present();
        this.toastMessage(result)
        this.navCtrl.setRoot(HomeEmpresaPage);
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível cadastrar o Usuário ");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }
        })
      }); 
    }
    
  }

}
