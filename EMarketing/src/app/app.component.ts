import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from './../pages/login/login';
import { MenuConsumidorPage } from './../pages/menu-consumidor/menu-consumidor';
import { CadastroUsuarioPage } from './../pages/cadastro-usuario/cadastro-usuario';
import { HomeConsumidorPage } from './../pages/home-consumidor/home-consumidor';

@Component({
  
  
  selector:'myapp',
  templateUrl: 'app.html'
  
})
export class MyApp {

  @ViewChild(Nav) public nav:Nav;
  
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

