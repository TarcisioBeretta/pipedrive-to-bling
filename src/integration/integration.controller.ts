import { Controller, Get } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {

  constructor(private integrationService: IntegrationService) { }

  @Get()
  async run() {
    this.integrationService.run();
  }
}
