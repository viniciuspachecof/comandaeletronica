import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private URI = api + 'produtos';

  constructor(
    private httpClient : HttpClient
  ) { }

  getProdutos() {
    return this.httpClient.get<Produto[]>(this.URI);
  }

  adicionar(produto: Produto) {
    return this.httpClient.post<Produto>(this.URI, produto);
  }

  atualizar(produto: Produto) {
    return this.httpClient.put<Produto>(`${this.URI}/${produto.id}`, produto);
  }

  excluir(produto: Produto) {
    return this.httpClient.delete(`${this.URI}/${produto.id}`);
  }

  getProduto(id: number) {
    return this.httpClient.get<Produto>(`${this.URI}/${id}`);
  }

  salvar(produto: Produto) {
    if (produto && produto.id) {
      return this.atualizar(produto);
    } else {
      return this.adicionar(produto);
    }
  }
}
