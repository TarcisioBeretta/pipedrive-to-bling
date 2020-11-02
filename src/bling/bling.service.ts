import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Builder as XmlParserBuilder } from 'xml2js';
import { BlingOrderReturn } from './interface/bling-order-return.interface';
import { BlingOrderSend } from './interface/bling-order-send.interface';
import { BlingPostOrderReturn } from './interface/bling-post-order-return.interface';

@Injectable()
export class BlingService {

  constructor(private httpService: HttpService) { }

  async createBlingOrder(order: BlingOrderSend): Promise<BlingOrderReturn> {
    const params = { params: { xml: this.convertOrderToXml(order) } };
    const response = this.httpService.post('pedido/json', null, params);
    const responseData = await this.getResponseData(response);
    this.validateResponseData(responseData)
    return responseData.retorno.pedidos[0].pedido;
  }

  private convertOrderToXml(order: BlingOrderSend): string {
    const builderConfigs = { renderOpts: { pretty: false } };
    const xmlToJsBuilder = new XmlParserBuilder(builderConfigs);
    const orderXml = xmlToJsBuilder.buildObject(order);
    return unescape(encodeURIComponent(orderXml));
  }

  private async getResponseData(responseObservable: Observable<any>): Promise<BlingPostOrderReturn> {
    const responsePromise = await responseObservable.toPromise();
    const responseData = responsePromise.data;
    return responseData;
  }

  private validateResponseData(responseData: BlingPostOrderReturn): void {
    if (responseData.retorno.erros && responseData.retorno.erros.length) {
      const error = responseData.retorno.erros[0].erro;
      throw new Error(`${error.cod} - ${error.msg}`);
    }
  }
}
