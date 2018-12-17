import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Publicacao } from './../../modelos/publicacao';
import { Usuario } from '../../modelos/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeEmpresaPage } from './../home-empresa/home-empresa';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';


@IonicPage()
@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html',
})
export class PublicacaoPage {


  private publicacao : Publicacao = new Publicacao();

  private API_URL = 'http://localhost:55409/api/Publicacao/'
  private _status : number = 1;
  private invalidou : boolean = false;


  form: FormGroup;
  text;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _http : HttpClient, private _load : LoadingController, private _toast : ToastController,
    private _usuarioService: UsuariosServiceProvider) {

   this.publicacao.usuario = new Usuario(); 

   //this.publicacao.dataPublicacao = this.dataHoje();

   this.publicacao.usuario = this._usuarioService.obtemUsuarioLogado();

   this.publicacao.idUsuario = this.publicacao.usuario.idUsuario;

  }

  publicar() {

    let path =  this.form.get('logo').value;
    this.publicacao.imagemPublicacao = path.value;

    let url = this.API_URL+'Create';

    this.toastMessage(this.validaPublicacao()); 

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.post(url,this.publicacao)
        .subscribe((result: any) => {
        this._load.create({ content: "Fazendo requisição", duration: 1000 }).present();
        this.toastMessage(result)
        this.navCtrl.push(HomeEmpresaPage)
        },
        (resposta : HttpErrorResponse)=> {
          this._status = resposta.status;
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Não foi possível fazer a publicação  ");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }
        })
      }); 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacaoPage');
    this.form = new FormGroup({
      logo: new FormControl('')
    })
  }

  onFileChange(event) {
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

  dataHoje(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
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
}
