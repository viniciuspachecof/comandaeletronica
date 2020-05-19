import { Comanda } from './comanda.interface';
import { Cliente } from './cliente.interface';
import { Funcionario } from './funcionario.interface';

export interface Venda {
    id?: number;
    observacao: string;
    valorTotal: number;
    comandas: Comanda[];
    clientes: Cliente[];
    funcionarios: Funcionario[]
};