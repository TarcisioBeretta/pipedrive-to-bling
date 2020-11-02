import { HttpModule, Module } from '@nestjs/common';
import { BlingService } from './bling.service';

const API_LINK = 'https://bling.com.br/Api/v2';
const API_TOKEN_KEY = 'apikey';

const httpConfig = {
  baseURL: API_LINK,
  params: {
    [API_TOKEN_KEY]: process.env.BLING_API_TOKEN
  }
}

@Module({
  imports: [HttpModule.register(httpConfig)],
  providers: [BlingService]
})
export class BlingModule { }
