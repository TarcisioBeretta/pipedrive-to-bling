import { Injectable } from "@nestjs/common";
import { BlingService } from "src/bling/bling.service";
import { BlingOrderReturn } from "src/bling/interface/bling-order-return.interface";
import { BlingOrderSend } from "src/bling/interface/bling-order-send.interface";
import { DealService } from "src/deal/deal.service";
import { Deal } from "src/deal/schema/deal.schema";
import { PipedriveDealReturn } from "src/pipedrive/interface/pipedrive-deal-return.interface";
import { PipedriveService } from "src/pipedrive/pipedrive.service";

@Injectable()
export class IntegrationService {

  constructor(
    private pipedriveService: PipedriveService,
    private blingService: BlingService,
    private dealService: DealService,
  ) { }

  async run(): Promise<void> {
    const pipedriveDeals = await this.pipedriveService.getPipedriveDeals();
    await this.proccessPipedriveDeals(pipedriveDeals);
  }

  private async proccessPipedriveDeals(pipedriveDeals: PipedriveDealReturn[]): Promise<void> {
    pipedriveDeals.forEach(async (pipedriveDeal) => await this.proccessPipedriveDeal(pipedriveDeal));
  }

  private async proccessPipedriveDeal(pipedriveDeal: PipedriveDealReturn): Promise<void> {
    const existentItem = await this.dealService.getByPipedriveDealId(pipedriveDeal.id)
    if (existentItem) {
      return;
    }

    const blingOrder = await this.createBlingOrder(pipedriveDeal);
    await this.createDeal(pipedriveDeal, blingOrder);
  }

  private async createBlingOrder(pipedriveDeal: PipedriveDealReturn): Promise<BlingOrderReturn> {
    const blingOrder = this.pipedriveDealToBlingOrder(pipedriveDeal);
    return this.blingService.createBlingOrder(blingOrder);
  }

  private async createDeal(pipedriveDeal: PipedriveDealReturn, blingOrder: BlingOrderReturn): Promise<void> {
    const deal = new Deal();
    deal.pipedriveDealId = pipedriveDeal.id;
    deal.blingOrderId = blingOrder.idPedido;
    deal.description = pipedriveDeal.title;
    deal.value = pipedriveDeal.value;
    deal.wonTime = new Date(pipedriveDeal.won_time);
    await this.dealService.create(deal);
  }

  private pipedriveDealToBlingOrder(pipedriveDeal: PipedriveDealReturn): BlingOrderSend {
    return {
      pedido: {
        cliente: {
          nome: pipedriveDeal.person_id.name,
          fone: pipedriveDeal.person_id.phone[0].value,
          email: pipedriveDeal.person_id.email[0].value
        },
        itens: [
          {
            item: {
              codigo: pipedriveDeal.id.toString(),
              descricao: pipedriveDeal.title,
              qtde: '1',
              vlr_unit: pipedriveDeal.value.toString(),
            }
          }
        ],
        parcelas: [
          {
            parcela: {
              vlr: pipedriveDeal.value.toString(),
            }
          }
        ]
      }
    };
  }
}
