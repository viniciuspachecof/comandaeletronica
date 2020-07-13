import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/funcionario.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private URI = api + 'funcionarios';

  constructor(
    private httpClient : HttpClient
  ) { };

  getFuncionarios() {
    return this.httpClient.get<Funcionario[]>(this.URI);
  };

  adicionar(funcionario: Funcionario) {
    return this.httpClient.post<Funcionario>(this.URI, funcionario);
  };

  atualizar(funcionario: Funcionario) {
    return this.httpClient.put<Funcionario>(`${this.URI}/${funcionario.id}`, funcionario);
  };

  excluir(funcionario: Funcionario) {
    return this.httpClient.delete(`${this.URI}/${funcionario.id}`);
  };

  getFuncionario(id: number) {
    return this.httpClient.get<Funcionario>(`${this.URI}/${id}`);
  };

  salvar(funcionario: Funcionario) {
    if (funcionario && funcionario.id) {
      return this.atualizar(funcionario);
    } else {
      return this.adicionar(funcionario);
    }
  };
};
