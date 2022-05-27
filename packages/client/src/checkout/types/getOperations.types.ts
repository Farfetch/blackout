import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetOperationsQuerySort = 'createdDate:desc' | 'createdDate:asc';

export type GetOperationsQuery = {
  page?: number;
  pageSize?: number;
  sort?: Array<GetOperationsQuerySort>;
  createdDate?: string;
};

export type GetOperationsResponse = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Array<CheckoutOrderOperation>;
};

export type GetOperations = (
  id: number,
  query?: GetOperationsQuery,
  config?: Config,
) => Promise<GetOperationsResponse>;
