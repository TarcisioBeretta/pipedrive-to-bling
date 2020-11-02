import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { PipedriveService } from './pipedrive.service';

const API_LINK = 'https://empresatarcisio.pipedrive.com/v1';
const API_TOKEN_KEY = 'api_token';

function configOptions() {
  return { isGlobal: true, envFilePath: './src/configs/.env' };
}

function getHttpConfig() {
  return { baseURL: API_LINK, params: { [API_TOKEN_KEY]: process.env.PIPEDRIVE_API_TOKEN } };
}

@Module({
  imports: [
    ConfigModule.forRoot(configOptions()),
    HttpModule.register(getHttpConfig())
  ],
  providers: [PipedriveService],
  exports: [PipedriveService]
})
export class PipedriveModule { }


