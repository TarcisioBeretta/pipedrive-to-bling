import { Test } from '@nestjs/testing';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

describe('IntegrationController', () => {
  let integrationController: IntegrationController;
  let integrationService: IntegrationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [IntegrationController],
      providers: [IntegrationService],
    }).compile();

    integrationController = moduleRef.get<IntegrationController>(IntegrationController);
    integrationService = moduleRef.get<IntegrationService>(IntegrationService);
  });

  it('should be defined', () => {
    expect(integrationController).toBeDefined();
  });
});
