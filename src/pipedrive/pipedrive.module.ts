import { HttpModule, Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';

const API_LINK = 'https://empresatarcisio.pipedrive.com/v1';
const API_TOKEN_KEY = 'api_token';

const httpConfig = {
  baseURL: API_LINK,
  params: {
    [API_TOKEN_KEY]: process.env.PIPEDRIVE_API_TOKEN
  }
}

@Module({
  imports: [HttpModule.register(httpConfig)],
  providers: [PipedriveService]
})
export class PipedriveModule { }
