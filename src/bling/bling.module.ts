import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlingService } from './bling.service';

const API_LINK = 'https://bling.com.br/Api/v2';
const API_TOKEN_KEY = 'apikey';

function configOptions() {
  return { isGlobal: true, envFilePath: './src/configs/.env' };
}

function getHttpConfig() {
  return { baseURL: API_LINK, params: { [API_TOKEN_KEY]: process.env.BLING_API_TOKEN } };
}

@Module({
  imports: [
    ConfigModule.forRoot(configOptions()),
    HttpModule.register(getHttpConfig())
  ],
  providers: [BlingService],
  exports: [BlingService]
})
export class BlingModule { }
