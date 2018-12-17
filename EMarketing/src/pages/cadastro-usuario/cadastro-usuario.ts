import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, DateTime, Events } from 'ionic-angular';
import { Usuario } from './../../modelos/usuario';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Consumidor } from './../../modelos/consumidor';
import { Empresa } from '../../modelos/empresa';
import { DatePicker } from '@ionic-native/date-picker';
import { Cidade } from './../../modelos/cidade';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Segmento } from './../../modelos/segmento';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginPage } from './../login/login';


@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  private API_URL = 'http://localhost:55409/api/'

  private usuario: Usuario = new Usuario();
  
  public cidades: Cidade[];

  private selecionouCidade : boolean;
  private selecionouSegmento : boolean;

  private _status : number = 1;

  private _dataAtual : string;

  private invalidou : boolean = false;

  public segmentos: Segmento[];

  form: FormGroup;
  text;

  sigla: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuarioService: UsuariosServiceProvider, private _datePicker: DatePicker,
    private _http: HttpClient, private _toast : ToastController, private _alert : AlertController, 
    private _load: LoadingController) {

    this.usuario.empresa = new Empresa();

    this._dataAtual = this.dataHoje();

    this.usuario.consumidor = new Consumidor();

    this.usuario.empresa.segmento = new Segmento();

    this.usuario.idCidade = 0;

    this.invalidou = false;

    this.usuario.isAdmin = false;

    this._http.get<Segmento[]>(this.API_URL + 'Segmento/GetAllSegmento/')
      .subscribe(
        (segmentos) => {
          this.segmentos = segmentos
          this._load.create({ content: "Carregando componentes", duration: 1000 }).present();
        },
        (resposta:HttpErrorResponse)=>{
          if(resposta.status == 0){
            this.toastMessage("Sem comunicação com o servidor !");
            this._status = resposta.status;
          }else if(resposta.status == 400){
            this.toastMessage("Segmentos não encontrados !");
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }                        
        }
      );

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

  ionViewDidLoad() {
    this.form = new FormGroup({
      logo: new FormControl('')
    })
  }

  cadastrar() {

    let path =  this.form.get('logo').value;
    this.usuario.empresa.logo = path.value;
    

    let url = this.API_URL+'Usuario/Create';
    this.toastMessage(this.validaUsuario()); 

    if(this.invalidou == false){
      return new Promise((resolve, reject) => {
        this._http.post(url,this.usuario)
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
            this.toastMessage(resposta.error.message);
          }else if(resposta.status == 500){
            this.toastMessage("Erro interno no servidor");
          }
        })
      }); 
    }
  }

  estado() {
    this.sigla = this.usuario.cidade.estado.sigla;
    this.selecionouCidade = true;
  }

  segmento(event) {
    
    this.selecionouSegmento = true;
    this.usuario.empresa.idSegmento = event.idSegmento;
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

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      data => this.usuario.consumidor.dataNascimento = data.toISOString()
    );
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


  validaUsuario(){
    if(this.usuario.nomeUsuario == null){
      this.invalidou = true;
      return "Campo Nome Usuário é obrigatório !"
    }
    if(this.usuario.senha == null){
      this.invalidou = true;
      return "Campo Senha é obrgatório !"
    }else if(this.usuario.senha.length < 5){
      this.invalidou = true;
      return "Campo senha deve possuir no mínimo 5 caracteres"
    }

    if(this.usuario.email == null){
      this.invalidou = true;
      return "Campo Email é obrigatório !"
    }

    if(this.usuario.isEmpresa == false){
      if(this.usuario.consumidor.nome == null){
        this.invalidou = true;
        return "Campo Nome é obrigatório "
      }
    }

    if(this.usuario.consumidor.dataNascimento > this._dataAtual){
      this.invalidou = true;
      return "Data deve ser menor que data atual !"
    }

    if(this.usuario.isEmpresa){
      if(!this.selecionouSegmento){
        this.invalidou = true;
        return "Informe um segmento empresarial !"
      }
    }

    if(!this.selecionouCidade){
      this.invalidou = true;
      return "Selecione uma cidade !"
    }
    
    this.invalidou = false;

    if(this.usuario.isEmpresa){

      if(this.usuario.empresa.cnpj == "" ||this.usuario.empresa.cnpj.length != 14){
        this.invalidou = true;
        return "Informe um CNPJ válido !"
        
      }
      if(this.usuario.empresa.razaoSocial == ""){
        this.invalidou = true;
        return "Campo Razão Social é obrigatório !"
      }
      if(this.usuario.empresa.fantasia == ""){
        this.invalidou = true;
        return "Campo Fantasia é obrigaório !"
      }
      if(this.usuario.empresa.endereco == ""){
        this.invalidou = true;
        return "Campo Endereço é obrigatório ! "
      }
      if(this.usuario.empresa.numero == null){
        this.invalidou = true;
        return "Campo Número é obrigatório !"
      }
      if(this.usuario.empresa.bairro == ""){
        this.invalidou = true;
        return "Campo bairro é obrigatório !"
      }
      if(this.usuario.empresa.cep == ""){
        this.invalidou = true;
        return "Campo CEP é obrigatório !"
      }

      if(this.usuario.empresa.telefone == "" || this.usuario.empresa.telefone.length < 10){
        this.invalidou = true;
        return "Campo telefone inválido !"
      }
      if(this.usuario.empresa.logo == ""){
        this.invalidou = true;
        return "Informe uma Logo !"
      }
      this.invalidou = false;
    }
  }
  dataHoje(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }
  
} 
