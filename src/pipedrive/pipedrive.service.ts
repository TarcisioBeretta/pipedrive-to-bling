import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PipedriveDealReturn } from './interface/pipedrive-deal-return.interface';
import { PipedriveGetDealsReturn } from './interface/pipedrive-get-deals-return.interface';

@Injectable()
export class PipedriveService {

  private readonly ENDPOINT = 'deals';
  private readonly STATUS_WON = 'won';

  constructor(private httpService: HttpService) { }

  async getPipedriveDeals(): Promise<PipedriveDealReturn[]> {
    const params = { params: { status: this.STATUS_WON } };
    const response = this.httpService.get(this.ENDPOINT, params);
    const responseData = await this.getResponseData(response);
    this.validateResponseData(responseData)
    return responseData.data;
  }

  private async getResponseData(responseObservable: Observable<any>): Promise<PipedriveGetDealsReturn> {
    const responsePromise = await responseObservable.toPromise();
    const responseData = responsePromise.data;
    return responseData;
  }

  private validateResponseData(responseData: PipedriveGetDealsReturn): void {
    if (!responseData.success) {
      throw new Error(`${responseData.errorCode} - ${responseData.error}`);
    }
  }
}
