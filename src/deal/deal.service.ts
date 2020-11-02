import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deal, DealDocument } from './schema/deal.schema';

@Injectable()
export class DealService {

  constructor(@InjectModel(Deal.name) private dealModel: Model<DealDocument>) { }

  async getAll(): Promise<Deal[]> {
    return await this.dealModel.find();
  }

  async getByPipedriveDealId(pipedriveDealId: number): Promise<Deal> {
    return await this.dealModel.findOne({ pipedriveDealId });
  }

  async create(deal: Deal): Promise<Deal> {
    return await new this.dealModel(deal).save();
  }
}
