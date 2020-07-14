import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  funcionario: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.funcionario = {
      nome: '',
      cpf: '',
      dataNascimento: '',
      cargo: ''
    };
  };

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const loading = await this.loadingController.create({ message: 'Carregando' });
      loading.present();
      this.funcionarioService.getFuncionario(id).subscribe((funcionario) => {
        this.funcionario = funcionario;
        let dataFuncionario = new Date(funcionario.dataNascimento);
        let dia = ("0" + dataFuncionario.getDate()).slice(-2);
        let mes = ("0" + (dataFuncionario.getMonth() + 1)).slice(-2);
        let ano = dataFuncionario.getFullYear();
        this.funcionario.dataNascimento = ano + '-' + mes + '-' + dia;
        loading.dismiss();
      });
    }
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    let dataFuncionario = new Date(this.funcionario.dataNascimento).getFullYear();
    let dataAtual = new Date().getFullYear();
    let idadeFuncionario = dataAtual - dataFuncionario;

    if (idadeFuncionario < 18) {
      loading.dismiss();
      this.mensagemAlerta();
      return;
    };

    this.funcionarioService
      .salvar(this.funcionario)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/funcionarios']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  };

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao salvar o funcionário.',
      buttons: ['OK']
    });

    await alerta.present();
  };
};
