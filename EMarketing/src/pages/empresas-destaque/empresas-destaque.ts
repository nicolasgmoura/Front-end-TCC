import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Empresa } from '../../modelos/empresa';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Avaliacao } from './../../modelos/avaliacao';
import { Acompanhamento } from './../../modelos/acompanhamento';




@IonicPage()
@Component({
  selector: 'page-empresas-destaque',
  templateUrl: 'empresas-destaque.html',
})
export class EmpresasDestaquePage {

  private API_URL = 'http://localhost:55409/api/Usuario/'
  private API_URL2 = 'http://localhost:55409/api/Avaliacao/'
  private API_URL3 = 'http://localhost:55409/api/Acompanhamento/'


  private avaliacao: Avaliacao = new Avaliacao();

  private acompanhamento: Acompanhamento = new Acompanhamento();
  private placeholder: string = "";
  numeroAvaliador = 0;
  idEmpresaSelecionada;
  public empresas: Empresa[];
  idConsumidor: number = 0;
  avaliou: boolean = false;
  private _status: number = 1;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http: HttpClient, public loadingCtrl: LoadingController,
    private _usuarioService: UsuariosServiceProvider, private _toast: ToastController) {


    this.idConsumidor = this.usuarioLogado.idUsuario;

    this._http.get<Empresa[]>(this.API_URL + '/EmpresasDestaque/' + this.usuarioLogado.idUsuario)
      .subscribe(
        (empresas) => {
          console.log(empresas);

          this.empresas = empresas;
          this.montarPlaceholder(this.empresas);
        }
      );
  }

  montarPlaceholder(empresas: Empresa[]) {
    this.placeholder = "Ex: "
    empresas.forEach(empresa => {
      if (this.placeholder.length == 4)
        this.placeholder = this.placeholder + empresa.segmento.descricao;
      else if(!this.placeholder.includes(empresa.segmento.descricao))
        this.placeholder = this.placeholder + ", " + empresa.segmento.descricao;

    });

  }
  get usuarioLogado() {
    return this._usuarioService.obtemUsuarioLogado();
  }

  Avaliar(valor, Idempresa) {

    this.idEmpresaSelecionada = Idempresa;
    this.numeroAvaliador = valor;
    this.avaliou = true;

  }

  EnviarAvaliacao() {

    let url = this.API_URL2 + 'Create';

    this.toastMessage(this.verificarAvaliacao());

    if (this.avaliou == true) {

      this.avaliacao.idConsumidor = this.idConsumidor;
      this.avaliacao.idEmpresa = this.idEmpresaSelecionada;
      this.avaliacao.valorAvaliacao = this.numeroAvaliador;

      return new Promise((resolve, reject) => {
        this._http.post(url, this.avaliacao)
          .subscribe((result: any) => {
            this.loadingCtrl.create({ content: "Fazendo requisição", duration: 1000 }).present();
            this.toastMessage(result)

            this.navCtrl.pop();
            this.navCtrl.push(EmpresasDestaquePage);

          },

            (resposta: HttpErrorResponse) => {
              this._status = resposta.status;
              if (resposta.status == 0) {
                this.toastMessage("Sem comunicação com o servidor !");
              } else if (resposta.status == 400) {
                this.toastMessage(resposta.error.message);
              } else if (resposta.status == 500) {
                this.toastMessage("Erro interno no servidor");
              }
            })
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresasDestaquePage');
  }

  toastMessage(mensagem: string) {
    this._status = 0;
    return this._toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

  acompanhar(idEmpresa) {

    let url = this.API_URL3 + 'Create';
    this.acompanhamento.idConsumidor = this.idConsumidor;
    this.acompanhamento.idEmpresa = idEmpresa;

    return new Promise((resolve, reject) => {
      this._http.post(url, this.acompanhamento)
        .subscribe((result: any) => {
          this.loadingCtrl.create({ content: "Fazendo requisição", duration: 1000 }).present();
          this.toastMessage(result)
        },

          (resposta: HttpErrorResponse) => {
            this._status = resposta.status;
            if (resposta.status == 0) {
              this.toastMessage("Sem comunicação com o servidor !");
            } else if (resposta.status == 400) {
              console.log(resposta.error)
              this.toastMessage(resposta.error);
            } else if (resposta.status == 500) {
              this.toastMessage("Erro interno no servidor");
            }
          })
    });
  }

  verificarAvaliacao() {
    if (this.avaliou == false) {
      return "Faça uma avaliação."
    }
  }
}
