import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { PipedriveService } from './pipedrive.service';

describe('PipedriveService', () => {
  let httpService: HttpService;
  let pipedriveService: PipedriveService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PipedriveService]
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
    pipedriveService = moduleRef.get<PipedriveService>(PipedriveService);
  });

  describe('getPipedriveDeals', () => {
    it('should return an array of deal', async () => {
      const endpoint = 'deals';
      const params = { params: { status: 'won' } };

      const deals = [{}, {}, {}]

      const data = {
        success: true,
        error: null,
        errorCode: null,
        data: deals,
        additional_data: {},
      }

      const httpGetReturn = of({
        status: 200,
        statusText: 'success',
        headers: [],
        config: {},
        data
      });

      jest.spyOn(httpService, 'get').mockImplementation(() => httpGetReturn);

      const returnedValue = await pipedriveService.getPipedriveDeals();
      expect(returnedValue).toBe(deals);
      expect(returnedValue.length).toBe(deals.length);
      expect(httpService.get).toBeCalledWith(endpoint, params);
    });
  });

  describe('getPipedriveDeals', () => {
    it('should throw an error', async () => {
      const endpoint = 'deals';
      const params = { params: { status: 'won' } };

      const data = {
        success: false,
        error: 'Mocked error',
        errorCode: 11554,
        data: [],
        additional_data: {},
      }

      const httpGetReturn = of({
        status: 200,
        statusText: 'error',
        headers: [],
        config: {},
        data
      });

      jest.spyOn(httpService, 'get').mockImplementation(() => httpGetReturn);

      try {
        await pipedriveService.getPipedriveDeals();
      } catch (e) {
        expect(e.message).toBe(`${data.errorCode} - ${data.error}`);
        expect(httpService.get).toBeCalledWith(endpoint, params);
      }
    });
  });
});
