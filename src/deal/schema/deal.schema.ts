import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealDocument = Deal & Document;

@Schema()
export class Deal {

  @Prop({ required: true })
  pipedriveDealId: number;

  @Prop({ required: true })
  blingOrderId: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  wonTime: Date;

  @Prop({ default: Date.now })
  integretionDate: Date;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
