import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {

  run(): Promise<void> {
    throw new Error('Not implemmented')
  }
}
