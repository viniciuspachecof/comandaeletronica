import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cliente: Cliente;

  constructor(
    private alertController: AlertController,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController
  ) {
    this.cliente = {
      nome: '',
      cpf: '',
      dataNascimento: '',
      cidade: ''
    };
  };

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const loading = await this.loadingController.create({ message: 'Carregando' });
      loading.present();
      this.clienteService.getCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
        let dataCliente = new Date(cliente.dataNascimento);
        let dia = ("0" + dataCliente.getDate()).slice(-2);
        let mes = ("0" + (dataCliente.getMonth() + 1)).slice(-2);
        let ano = dataCliente.getFullYear();
        this.cliente.dataNascimento = ano + '-' + mes + '-' + dia;
        loading.dismiss();
      });
    }
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();    

    this.clienteService
      .salvar(this.cliente)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/clientes']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  };

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao salvar o cliente.',
      buttons: ['OK']
    });

    await alerta.present();
  };
};
