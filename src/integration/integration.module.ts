import { Module } from '@nestjs/common';
import { BlingModule } from 'src/bling/bling.module';
import { DealModule } from 'src/deal/deal.module';
import { PipedriveModule } from 'src/pipedrive/pipedrive.module';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  imports: [
    PipedriveModule,
    BlingModule,
    DealModule,
  ],
  providers: [IntegrationService],
  controllers: [IntegrationController]
})
export class IntegrationModule { }
