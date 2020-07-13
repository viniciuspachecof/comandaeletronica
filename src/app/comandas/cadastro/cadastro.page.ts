import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto.interface';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Comanda } from 'src/app/models/comanda.interface';
import { ComandaService } from 'src/app/services/comanda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  comanda: Comanda;
  produtos: Produto[];

  constructor(
    private alertController: AlertController,
    private produtoService: ProdutoService,
    private comandaService: ComandaService,
    private busyLoader: BusyLoaderService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.comanda = {
      numero: null,
      produtos: [],
      qtde: 1
    };
  };

  ngOnInit() {
    this.listarProdutos();
  };

  async listarProdutos() {
    const busyLoader = await this.busyLoader.create('Carregando produtos...');

    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      this.carregarComanda();
      busyLoader.dismiss();
    });
  };

  carregarComanda() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.comandaService.getComanda(id).subscribe(comanda => this.comanda = comanda);
    }
  };

  compareWith(produto1: Produto, produto2: Produto) {
    return produto1 && produto2 ? produto1.id === produto2.id : produto1 === produto2;
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.comandaService
      .salvar(this.comanda)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/comandas']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  };

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao salvar a comanda.',
      buttons: ['OK']
    });

    await alerta.present();
  }; 
};
