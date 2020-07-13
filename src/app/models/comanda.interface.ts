import { Produto } from './produto.interface';

export interface Comanda {
    id?: number;
    numero: number;
    produtos: Produto[];
    qtde: number;
};