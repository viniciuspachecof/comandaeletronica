import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto.interface';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produtos: Produto[];

  constructor(
    private alertController: AlertController,
    private produtoService: ProdutoService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    this.produtoService.getProdutos().subscribe((data) => {
      this.produtos = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(produto: Produto) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o produto ${produto.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(produto);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(produto: Produto) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();

    this.produtoService.excluir(produto).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    }, () => {
      busyLoader.dismiss();
      this.mensagemAlerta();
    });
  };

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao excluir o produto.',
      buttons: ['OK']
    });

    await alerta.present();
  };
};
