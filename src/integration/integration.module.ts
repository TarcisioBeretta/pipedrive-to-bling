import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  providers: [IntegrationService],
  controllers: [IntegrationController]
})
export class IntegrationModule { }
