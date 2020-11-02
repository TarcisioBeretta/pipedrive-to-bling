import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { PipedriveDealReturn } from './interface/pipedrive-deal-return.interface';
import { PipedriveService } from './pipedrive.service';

const endpoint = 'deals';

const params = { params: { status: 'won' } };

const deals = [{}, {}, {}]

const dataSuccess = {
  success: true,
  error: null,
  errorCode: null,
  data: deals,
  additional_data: {},
}

const dataError = {
  success: false,
  error: 'Mocked error',
  errorCode: 11554,
  data: [],
  additional_data: {},
}

const httpGetReturnSuccess = of({
  status: 200,
  statusText: 'success',
  headers: [],
  config: {},
  data: dataSuccess
});

const httpGetReturnError = of({
  status: 200,
  statusText: 'error',
  headers: [],
  config: {},
  data: dataError
});

const errorMessage = `${dataError.errorCode} - ${dataError.error}`

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

  it('should be defined', () => {
    expect(PipedriveService).toBeDefined();
  });

  describe('getPipedriveDeals', () => {
    it('should return an array of deal', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => httpGetReturnSuccess);

      const returnedValue = await pipedriveService.getPipedriveDeals();

      expect(returnedValue).toBe(deals);
      expect(returnedValue.length).toBe(deals.length);
      expect(httpService.get).toBeCalledWith(endpoint, params);
    });
  });

  describe('getPipedriveDeals', () => {
    it('should throw an error on getPipedriveDeals', async () => {
      let error: Error;
      let returnedValue: PipedriveDealReturn[];

      jest.spyOn(httpService, 'get').mockImplementation(() => httpGetReturnError);

      try {
        returnedValue = await pipedriveService.getPipedriveDeals();
      } catch (e) {
        error = e;
      }

      expect(returnedValue).toEqual(undefined);
      expect(error.message).toBe(errorMessage);
      expect(httpService.get).toBeCalledWith(endpoint, params);
    });
  });
});
