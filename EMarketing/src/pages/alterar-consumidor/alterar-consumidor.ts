import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Consumidor } from './../../modelos/consumidor';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatePicker } from '@ionic-native/date-picker';
import { LoginPage } from '../login/login';
import { Cidade } from './../../modelos/cidade';



@IonicPage()
@Component({
  selector: 'page-alterar-consumidor',
  templateUrl: 'alterar-consumidor.html',
})
export class AlterarConsumidorPage {

  private usuario: Usuario = new Usuario();

  private API_URL = 'http://localhost:55409/api/'
  public cidades: Cidade[];
  private _status : number = 1;
  private selecionouCidade : boolean;
  private invalidou : boolean = false;
  private _dataAtual : string;

  sigla: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _usuarioService : UsuariosServiceProvider, private _http : HttpClient, private _load : LoadingController,
  private _toast : ToastController, private _datePicker: DatePicker) {

    this.usuario = _usuarioService.obtemUsuarioLogado();

    this._http.get<Cidade[]>(this.API_URL + 'Cidade/GetAllCidade/')
      .subscribe(
        (cidades) => {
          this.cidades = cidades
          this._load.create({ content: "Carregando componentes", duration: 1000 }).present();
        }, 
        (resposta: HttpErrorResponse) =>{
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
          }else if(resposta.status == 400){
            this.toastMessage("Cidades não encontradas !");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }
        }
      );
  }

  alterarConsumidor() {

    let url = this.API_URL+'Usuario/Change/'+this.usuario.idUsuario;

    this.toastMessage(this.validaUsuario()); 

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.put(url,this.usuario,)
        .subscribe((result: any) => {
        this._load.create({ content: "Fazendo requisição", duration: 1000 }).present();
        this.toastMessage(result)
        this.navCtrl.setRoot(LoginPage);
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

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarConsumidorPage');
  }
  
 
  estado(event) {
    this.cidades.forEach(element => {
      if(element.descricao == event){
        this.usuario.cidade.estado.sigla = element.estado.sigla;  
        this.usuario.cidade.idCidade = element.idCidade;
        this.usuario.cidade.descricao = element.descricao;
        this.usuario.cidade.estado.idEstado = element.estado.idEstado;
      }
    });
  }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      data => this.usuario.consumidor.dataNascimento = data.toISOString()
    );
  }


  validaUsuario(){
    if(this.usuario.nomeUsuario == ""){
      this.invalidou = true;
      return "Campo Nome Usuário é obrigatório !"
    }
    if(this.usuario.senha == ""){
      this.invalidou = true;
      return "Campo Senha é obrgatório !"
    }else if(this.usuario.senha.length < 5){
      this.invalidou = true;
      return "Campo senha deve possuir no mínimo 5 caracteres"
    }

    if(this.usuario.email == ""){
      this.invalidou = true;
      return "Campo Email é obrigatório !"
    }

    
    if(this.usuario.consumidor.nome == ""){
      this.invalidou = true;
      return "Campo Nome é obrigatório "
  }

    if(this.usuario.consumidor.dataNascimento > this._dataAtual){
      this.invalidou = true;
      return "Data deve ser menor que data atual !"
    }
    this.invalidou = false;
  }

}
