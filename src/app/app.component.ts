import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Início',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Clientes',
      url: '/clientes',
      icon: 'people'
    },
    {
      title: 'Funcionários',
      url: '/funcionarios',
      icon: 'person'
    },
    {
      title: 'Produtos',
      url: '/produtos',
      icon: 'fast-food'
    },
    {
      title: 'Comandas',
      url: '/comandas',
      icon: 'book'
    },
    {
      title: 'Vendas',
      url: '/vendas',
      icon: 'cart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  };

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  };
};
