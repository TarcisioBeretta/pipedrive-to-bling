import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlingModule } from './bling/bling.module';
import { DealModule } from './deal/deal.module';
import { IntegrationModule } from './integration/integration.module';
import { PipedriveModule } from './pipedrive/pipedrive.module';

const configOptions = {
  isGlobal: true,
  envFilePath: './src/configs/.env'
}

@Module({
  imports: [
    BlingModule,
    PipedriveModule,
    DealModule,
    IntegrationModule,
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
