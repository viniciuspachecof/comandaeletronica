import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/produto.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  produto: Produto;

  constructor(
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController
  ) {
    this.produto = {
      nome: '',
      valor: null,
      observacao: '',
    };
  };

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if (id) {
      // Carregar as informações
      const loading = await this.loadingController.create({ message: 'Carregando' });
      loading.present();
      this.produtoService.getProduto(id).subscribe((produto) => {
        this.produto = produto;
        loading.dismiss();
      });
    }
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.produtoService
      .salvar(this.produto)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/produtos']);
      });
  };
};
