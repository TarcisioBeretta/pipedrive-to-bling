import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlingModule } from './bling/bling.module';
import { DealModule } from './deal/deal.module';
import { IntegrationModule } from './integration/integration.module';
import { PipedriveModule } from './pipedrive/pipedrive.module';

function configOptions() {
  return { isGlobal: true, envFilePath: './src/configs/.env' };
}

function getMongoConfig() {
  return process.env.MONGO_CONNECTION_STRING;
}

@Module({
  imports: [
    ConfigModule.forRoot(configOptions()),
    MongooseModule.forRoot(getMongoConfig()),
    BlingModule,
    PipedriveModule,
    DealModule,
    IntegrationModule,
  ]
})
export class AppModule { }
