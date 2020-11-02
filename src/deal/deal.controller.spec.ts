import { Model } from 'mongoose';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { Deal, DealDocument } from './schema/deal.schema';

describe('DealController', () => {
  let dealModel: Model<DealDocument>;
  let dealService: DealService;
  let dealController: DealController;

  beforeEach(() => {
    dealModel = new Object() as Model<DealDocument>;
    dealService = new DealService(dealModel);
    dealController = new DealController(dealService);
  });

  it('should be defined', () => {
    expect(dealController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of deal', async () => {
      const deal = new Deal();
      const mockedReturn = [deal];
      const mockedPromise = new Promise<Deal[]>((resolve) => resolve(mockedReturn));

      jest.spyOn(dealService, 'getAll').mockImplementation(() => mockedPromise);

      const returnedValue = await dealController.getAll();
      expect(returnedValue).toBe(mockedReturn);
      expect(returnedValue.length).toBe(mockedReturn.length);
      expect(dealService.getAll).toBeCalled();
    });
  });
});







