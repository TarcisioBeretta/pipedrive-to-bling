import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { Deal, DealSchema } from './schema/deal.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }])],
  providers: [DealService],
  controllers: [DealController],
})
export class DealModule { }
