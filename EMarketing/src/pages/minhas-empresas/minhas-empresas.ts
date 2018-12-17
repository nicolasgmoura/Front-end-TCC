import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Empresa } from './../../modelos/empresa';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { VerDadosEmpresaPage } from '../ver-dados-empresa/ver-dados-empresa';
import { Acompanhamento } from './../../modelos/acompanhamento';
import { HomeConsumidorPage } from '../home-consumidor/home-consumidor';


@IonicPage()
@Component({
  selector: 'page-minhas-empresas',
  templateUrl: 'minhas-empresas.html',
})
export class MinhasEmpresasPage {

  private API_URL = 'http://localhost:55409/api/Usuario/'
  private API_URL2 = 'http://localhost:55409/api/Acompanhamento/'

  public empresas : Empresa[];
  idConsumidor : number = 0;
  private _status : number = 1;

  acompanhemento : Acompanhamento;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http : HttpClient, public loadingCtrl: LoadingController,
      private _usuarioService : UsuariosServiceProvider,private _alert : AlertController,
       private _toast : ToastController) {

      this.acompanhemento = new Acompanhamento();
    
    this.idConsumidor = this.usuarioLogado.idUsuario;

    this._http.get<Empresa[]>(this.API_URL+'/MinhasEmpresas/'+this.usuarioLogado.idUsuario)
                      .subscribe(
                      (empresas) =>{
                      this.empresas = empresas;
                    }
                  );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasEmpresasPage');
  }

  get usuarioLogado(){
    return this._usuarioService.obtemUsuarioLogado();
  }
  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }


  deixarDeAcompanhar(empresa:Empresa){

    this.acompanhemento.idConsumidor = this.idConsumidor;
    this.acompanhemento.idEmpresa = empresa.idEmpresa;

    let alert = this._alert.create({
      title: 'Deseja Realmente deixar de acompanhar esta empresa ?',
      message: 'Ao fazer, você deixará de ver as publicações de '+empresa.fantasia+".",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let url = this.API_URL2+'DeixarDeAcompanhar/'
              return new Promise((resolve, reject) => {
                this._http.post(url, this.acompanhemento)
                .subscribe((result: any) => {

                this.loadingCtrl.create({ content: "fazendao requisição...", duration: 1000 }).present();
                this.toastMessage(result)
                this.navCtrl.setRoot(HomeConsumidorPage);

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
  verDadosEmpresa(empresa : Empresa){
    this.navCtrl.push(VerDadosEmpresaPage, {empresaSelecionada : empresa})
  }
}
