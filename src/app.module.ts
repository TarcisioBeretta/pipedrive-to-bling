import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlingModule } from './bling/bling.module';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { DealModule } from './deal/deal.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [BlingModule, PipedriveModule, DealModule, IntegrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
