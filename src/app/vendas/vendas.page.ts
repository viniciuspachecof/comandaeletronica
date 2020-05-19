import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { VendaService } from '../services/venda.service';
import { Venda } from '../models/venda.interface';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit {

  vendas: Venda[];

  constructor(
    private alertController: AlertController,
    private vendaService: VendaService,
    private loadingController: LoadingController
  ) { };

  ngOnInit() { };

  ionViewWillEnter() {
    this.listar();
  };

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    this.vendaService.getVendas().subscribe((data) => {
      this.vendas = data;
      loading.dismiss();
    });
  };

  async confirmarExclusao(venda: Venda) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a venda ${venda.observacao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(venda);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  };

  private async excluir(venda: Venda) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();

    this.vendaService.excluir(venda).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  };
};
