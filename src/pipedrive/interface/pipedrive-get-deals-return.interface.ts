import { PipedriveDealReturn } from "./pipedrive-deal-return.interface";

export interface PipedriveGetDealsReturn {
  success: boolean;
  error: string,
  errorCode: number
  data: PipedriveDealReturn[];
  additional_data: AdditionalData;
}

interface AdditionalData {
  pagination: Pagination;
}

interface Pagination {
  start: number;
  limit: number;
  more_items_in_collection: boolean;
}
