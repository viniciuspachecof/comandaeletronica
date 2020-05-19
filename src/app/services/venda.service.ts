import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../models/venda.interface';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private URI = 'http://localhost:3000/vendas';

  constructor(
    private httpClient : HttpClient
  ) { }

  getVendas() {
    return this.httpClient.get<Venda[]>(this.URI);
  }

  adicionar(venda: Venda) {
    return this.httpClient.post<Venda>(this.URI, venda);
  }

  atualizar(venda: Venda) {
    return this.httpClient.put<Venda>(`${this.URI}/${venda.id}`, venda);
  }

  excluir(venda: Venda) {
    return this.httpClient.delete(`${this.URI}/${venda.id}`);
  }

  getVenda(id: number) {
    return this.httpClient.get<Venda>(`${this.URI}/${id}`);
  }

  salvar(venda: Venda) {
    if (venda.id) {
      return this.atualizar(venda);
    } else {
      return this.adicionar(venda);
    }
  }
}
