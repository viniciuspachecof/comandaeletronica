import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comanda } from '../models/comanda.interface';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  private URI = 'http://localhost:3000/comandas';
  
  constructor(
    private httpClient:HttpClient
  ) { };
    
  getComandas() {
    return this.httpClient.get<Comanda[]>(this.URI);
  };

  excluir(comanda: Comanda) {
    return this.httpClient.delete(`${this.URI}/${comanda.id}`);
  };

  private adicionar(comanda: Comanda) {
    return this.httpClient.post(this.URI, comanda);
  };

  private atualizar(comanda: Comanda) {
    return this.httpClient.put(`${this.URI}/${comanda.id}`, comanda);
  };

  getComanda(id: number) {
    return this.httpClient.get<Comanda>(`${this.URI}/${id}`);
  };

  salvar(comanda: Comanda) {
    if(comanda.id) {
      return this.atualizar(comanda);
    } else {
      return this.adicionar(comanda);
    }
  };
};
