export interface BlingOrderReturn {
  numero: string;
  idPedido: number;
  codigos_rastreamento: CodigosRastreamento;
  volumes: Volume[];
}

interface CodigosRastreamento {
  codigo_rastreamento?: any;
}

interface Volume {
  servico: string;
  codigoRastreamento: string;
}
