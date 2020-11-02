import { BlingOrderReturn } from "./bling-order-return.interface";

export interface BlingPostOrderReturn {
  retorno: Retorno;
}

interface Pedido {
  pedido: BlingOrderReturn;
}

interface Retorno {
  pedidos: Pedido[];
  erros: Erro[];
}

interface Erro2 {
  cod: number;
  msg: string;
}

interface Erro {
  erro: Erro2;
}
