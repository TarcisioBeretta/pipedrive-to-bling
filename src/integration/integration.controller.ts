import { Controller, Get } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationReturn } from './interface/integration-return.interface';


@Controller('integration')
export class IntegrationController {

  constructor(private integrationService: IntegrationService) { }

  @Get()
  async run(): Promise<IntegrationReturn> {
    try {
      await this.integrationService.run();
      return {
        success: true,
        message: 'Integration is running!',
      }
    } catch (exception) {
      return {
        success: false,
        message: exception.message,
      }
    }
  }
}
