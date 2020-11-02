import { Controller, Get } from '@nestjs/common';
import { DealService } from './deal.service';
import { Deal } from './schema/deal.schema';

@Controller('deal')
export class DealController {

  constructor(private dealService: DealService) { }

  @Get()
  async getAll(): Promise<Deal[]> {
    return await this.dealService.getAll();
  }
}
