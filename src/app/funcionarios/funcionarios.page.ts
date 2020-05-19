import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../models/funcionario.interface';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage implements OnInit {

  funcionarios: Funcionario[];

  constructor(
    private alertController: AlertController,
    private funcionarioService: FuncionarioService,
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
    this.funcionarioService.getFuncionarios().subscribe((data) => {
      this.funcionarios = data;
      loading.dismiss();
    });
  };

  async confirmarExclusao(funcionario: Funcionario) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o funcionário ${funcionario.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(funcionario);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  };

  private async excluir(funcionario: Funcionario) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();

    this.funcionarioService.excluir(funcionario).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  };
};
