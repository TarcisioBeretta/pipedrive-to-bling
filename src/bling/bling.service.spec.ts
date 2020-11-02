import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { Builder as XmlParserBuilder } from 'xml2js';
import { BlingService } from './bling.service';
import { BlingOrderReturn } from './interface/bling-order-return.interface';

const endpoint = 'pedido/json';

const orderSend = {
  pedido: {
    cliente: {
      nome: 'Client Name',
      fone: '1799544583',
      email: 'client@mainModule.com'
    },
    itens: [
      {
        item: {
          codigo: '5566486',
          descricao: 'item',
          un: null,
          qtde: '1',
          vlr_unit: '1500',
        }
      }
    ],
    parcelas: [
      {
        parcela: {
          data: null,
          vlr: '1500',
          obs: null,
        }
      }
    ]
  }
}

const orderReturn = {
  numero: '0054658',
  idPedido: 115468,
  codigos_rastreamento: {
    codigo_rastreamento: null,
  },
  volumes: [
    {
      servico: 'description',
      codigoRastreamento: '00554488899665',
    }
  ]
}

const blingPostOrderReturn = {
  retorno: {
    pedidos: [
      {
        pedido: orderReturn,
      }
    ],
    erros: [],
  }
}

const error = {
  cod: '555',
  msg: 'error message',
}

const blingPostOrderReturnWithError = {
  retorno: {
    pedidos: [],
    erros: [
      {
        erro: error,
      }
    ],
  }
}

const httpPostReturn = of({
  status: 200,
  statusText: 'success',
  headers: [],
  config: {},
  data: blingPostOrderReturn
});

const httpPostReturnWithError = of({
  status: 200,
  statusText: 'success',
  headers: [],
  config: {},
  data: blingPostOrderReturnWithError
});

const errorMessage = `${error.cod} - ${error.msg}`

const params = { params: { xml: getOrderXml() } };

function getOrderXml(): string {
  const builderConfigs = { renderOpts: { pretty: false } };
  const xmlToJsBuilder = new XmlParserBuilder(builderConfigs);
  const orderXml = xmlToJsBuilder.buildObject(orderSend);
  return unescape(encodeURIComponent(orderXml));
}

describe('BlingService', () => {
  let httpService: HttpService;
  let blingService: BlingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BlingService]
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
    blingService = moduleRef.get<BlingService>(BlingService);
  });

  it('should be defined', () => {
    expect(BlingService).toBeDefined();
  });

  describe('createBlingOrder', () => {
    it('should create an order in Bling', async () => {
      jest.spyOn(httpService, 'post').mockImplementation(() => httpPostReturn);

      const returnedValue = await blingService.createBlingOrder(orderSend);

      expect(returnedValue).toBe(orderReturn);
      expect(httpService.post).toBeCalledWith(endpoint, null, params);
    });
  });

  describe('createBlingOrder', () => {
    it('should throw an error on createBlingOrder', async () => {
      let error: Error;
      let returnedValue: BlingOrderReturn;

      jest.spyOn(httpService, 'post').mockImplementation(() => httpPostReturnWithError);

      try {
        returnedValue = await blingService.createBlingOrder(orderSend);
      } catch (e) {
        error = e;
      }

      expect(returnedValue).toEqual(undefined);
      expect(error.message).toBe(errorMessage);
      expect(httpService.post).toBeCalledWith(endpoint, null, params);
    });
  });
});
