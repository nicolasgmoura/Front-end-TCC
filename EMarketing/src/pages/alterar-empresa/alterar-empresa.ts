import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatePicker } from '@ionic-native/date-picker';
import { LoginPage } from '../login/login';
import { Cidade } from './../../modelos/cidade';
import { Empresa } from '../../modelos/empresa';
import { Segmento } from '../../modelos/segmento';
import { FormGroup, FormControl } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-alterar-empresa',
  templateUrl: 'alterar-empresa.html',
})
export class AlterarEmpresaPage {

  private usuario: Usuario = new Usuario();

  private API_URL = 'http://localhost:55409/api/'
  public cidades: Cidade[];
  private _status : number = 1;
  private selecionouSegmento : boolean;
  private selecionouCidade : boolean;
  private invalidou : boolean = false;
  private _dataAtual : string;
  public segmentos: Segmento[];
  private descricaoSegmento : string;
  form: FormGroup;
  text;
  private selecionouLogo = false;

  sigla: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _usuarioService : UsuariosServiceProvider, private _http : HttpClient, private _load : LoadingController,
  private _toast : ToastController, private _datePicker: DatePicker) {

    this.usuario = _usuarioService.obtemUsuarioLogado();
    
    this.descricaoSegmento = this.usuario.empresa.segmento.descricao;

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

  alterarEmpresa() {

    if(this.selecionouLogo == true){

      let path =  this.form.get('logo').value;
      this.usuario.empresa.logo = path.value;
    }
    
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
    this.form = new FormGroup({
      logo: new FormControl('')
    })
  }

  onFileChange(event) {
    
    this.selecionouLogo = true;
    
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


  
  segmento(event) {
    this.selecionouSegmento = true;
    this.segmentos.forEach(element => {
      if(element.descricao == event){
        this.usuario.empresa.segmento.descricao = element.descricao;  
        this.usuario.empresa.segmento.idSegmento = element.idSegmento;
        this.usuario.empresa.segmento.descricao = element.descricao;
      }
    });
  }

  
 
  estado(event) {
    this.cidades.forEach(element => {
      if(element.descricao == event){
        this.usuario.cidade.estado.sigla = element.estado.sigla;  
        this.usuario.cidade.idCidade = element.idCidade;
        this.usuario.cidade.descricao = element.descricao;
        this.usuario.cidade.estado.idEstado = element.estado.idEstado;
        this.usuario.cidade.estado.descricao = element.descricao;
        this.usuario.cidade.idEstado = element.idEstado;
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
    if(this.usuario.empresa.numero.toString() == "" ){
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

    if(this.usuario.empresa.telefone == "" || this.usuario.empresa.telefone.length < 10 || this.usuario.empresa.telefone.length > 11){
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
