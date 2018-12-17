import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, TextInput } from 'ionic-angular';
import { HomePage } from './../home/home';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Usuario } from './../../modelos/usuario';
import { MenuConsumidorPage } from '../menu-consumidor/menu-consumidor';
import { MenuEmpresaPage } from './../menu-empresa/menu-empresa';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { RecuperarSenhaPage } from './../recuperar-senha/recuperar-senha';
import { HomeAdministradorPage } from './../home-administrador/home-administrador';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('login') login:TextInput;
  private _usuarioInformado : Usuario = new Usuario();


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _usuarioService :UsuariosServiceProvider, private _alertCtrl : AlertController) {


      this._usuarioInformado.nomeUsuario = "Consumidor 1";
      this._usuarioInformado.senha = "123";

  }

 ionViewDidLoad(){
   setTimeout(() => {
     this.login.setFocus();
   }, 500);
 }

  efetuaLogin(){
  
    this._usuarioInformado.nomeUsuario = "Consumidor 1";
    this._usuarioInformado.senha = "123";

  this._usuarioService.efetuaLogin(this._usuarioInformado)
                                    .subscribe(
                                      (usuario : Usuario)=>{
                                        console.log(usuario); 
                                        if(usuario.isEmpresa){
                                          this.navCtrl.setRoot(MenuEmpresaPage)
                                        }else if(usuario.isEmpresa == false && usuario.isAdmin == false){
                                          this.navCtrl.setRoot(MenuConsumidorPage);
                                        }else if(usuario.isAdmin){
                                          this.navCtrl.setRoot(HomeAdministradorPage);
                                        }                                        
                                      }, 
                                      () => {
                                        this._alertCtrl.create({

                                          title : 'Falha no Login', 
                                          subTitle : 'Email ou senha incorretos ! Verifique!', 
                                          buttons: [
                                            { text : 'Ok'}
                                          ]
                                        }).present();
                                      }
                                    );
                                    
  }

  irCadastro(){
    this.navCtrl.push(CadastroUsuarioPage);
  }
  
  recuperarSenha(){
    this.navCtrl.push(RecuperarSenhaPage);
  }
}
