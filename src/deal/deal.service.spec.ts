import { Model } from 'mongoose';
import { DealService } from './deal.service';
import { Deal, DealDocument } from './schema/deal.schema';

describe('DealService', () => {
  let dealModel: Model<DealDocument>;
  let dealService: DealService;

  beforeEach(() => {
    dealModel = new Object() as Model<DealDocument>;
    dealService = new DealService(dealModel);
  });

  it('should be defined', () => {
    expect(dealService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of deal', async () => {
      const deal = new Deal() as DealDocument;
      const mockedReturn = [deal];

      dealModel.find = jest.fn().mockReturnValue(mockedReturn);

      const returnedValue = await dealService.getAll();
      expect(returnedValue).toBe(mockedReturn);
      expect(returnedValue.length).toBe(mockedReturn.length);
      expect(dealModel.find).toBeCalled();
    });
  });

  describe('getByPipedriveDealId', () => {
    it('should return a deal', async () => {
      const deal = new Deal() as DealDocument;
      const pipedriveDealId = 11564;
      const pipedriveDealParameter = { "pipedriveDealId": 11564 };

      dealModel.findOne = jest.fn().mockReturnValue(deal);

      const returnedValue = await dealService.getByPipedriveDealId(pipedriveDealId);
      expect(returnedValue).toBe(deal);
      expect(dealModel.findOne).toBeCalledWith(pipedriveDealParameter);
    });
  });
});
