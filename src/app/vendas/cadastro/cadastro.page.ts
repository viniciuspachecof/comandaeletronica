import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/services/comanda.service';
import { Comanda } from 'src/app/models/comanda.interface';
import { Cliente } from 'src/app/models/cliente.interface';
import { Funcionario } from 'src/app/models/funcionario.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Venda } from 'src/app/models/venda.interface';
import { VendaService } from 'src/app/services/venda.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  venda: Venda;
  comandas: Comanda[];
  clientes: Cliente[];
  funcionarios: Funcionario[];

  constructor(
    private comandaService: ComandaService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private vendaService: VendaService,
    private busyLoader: BusyLoaderService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.venda = {
      observacao: '',
      valorTotal: null,
      comandas: [],
      clientes: [],
      funcionarios: []
    };
  };

  ngOnInit() {
    // const carregarLista = new Observable(subscriber => {
    //   subscriber.next();
    // });

    // carregarLista.subscribe(() => {
    //   this.listarComandas();
    // });
    // carregarLista.subscribe(() => {
    //   this.listarClientes();
    // });
    // carregarLista.subscribe(() => {
    //   this.listarFuncionarios();
    // });
    // carregarLista.subscribe(() => {
    //   this.carregarVenda();
    // });

    this.listarComandas();
    this.listarClientes();
    this.listarFuncionarios();
  };

  async listarComandas() {
    const busyLoader = await this.busyLoader.create('Carregando comandas...');

    this.comandaService.getComandas().subscribe((comandas) => {
      this.comandas = comandas;      
      this.carregarVenda();
      busyLoader.dismiss();
    });
  };

  async listarClientes() {
    const busyLoader = await this.busyLoader.create('Carregando clientes...');

    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;      
      this.carregarVenda();
      busyLoader.dismiss();
    });
  };

  async listarFuncionarios() {
    const busyLoader = await this.busyLoader.create('Carregando funcionarios...');
    
    this.funcionarioService.getFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;      
      this.carregarVenda();
      busyLoader.dismiss();
    });
  };

  carregarVenda() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.vendaService.getVenda(id).subscribe(venda => this.venda = venda);
    }
  };

  compareWithComanda(comanda1: Comanda, comanda2: Comanda) {
    return comanda1 && comanda2 ? comanda1.id === comanda2.id : comanda1 === comanda2;
  };

  compareWithCliente(cliente1: Cliente, cliente2: Cliente) {
    return cliente1 && cliente2 ? cliente1.id === cliente2.id : cliente1 === cliente2;
  };

  compareWithFuncionario(funcionario1: Funcionario, funcionario2: Funcionario) {
    return funcionario1 && funcionario2 ? funcionario1.id === funcionario2.id : funcionario1 === funcionario2;
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.vendaService
      .salvar(this.venda)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/vendas']);
      });
  };

  onChangeComanda() {
    let dadosComandas = this.venda.comandas;
    let dadosProdutos = dadosComandas["produtos"];
    let totalValorProdutos = dadosProdutos.reduce((totalValorProdutos, dadosProdutos) => totalValorProdutos + dadosProdutos.valor, 0);
    let totalVenda = totalValorProdutos * dadosComandas["qtde"]
    this.venda.valorTotal = totalVenda;
  };
};
