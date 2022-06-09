import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetOperationsQuerySort = 'createdDate:desc' | 'createdDate:asc';

export type GetOperationsQuery = {
  /** Number of the page to get, starting at 1. The default is 1. */
  page?: number;
  /** Size of each page, as a number between 1 and 180. The default is 60. */
  pageSize?: number;
  /**
   * Sorts the operations by the created date in ascending or descending order. The default is to sort by created date descending.
   * One of the following:
   * - createdDate:desc: Sorts by the operation createdDate, starting with the newest operation.
   * - createdDate:asc: Sorts by the operation createdDate, starting with the oldest operation.
   */
  sort?: Array<GetOperationsQuerySort>;
  /** Operations created in specific time range, specified as a complex filter. Only 'ge' and 'le' are supported. */
  createdDate?: string;
};

export type GetOperationsResponse = {
  /** Number of the page of operations requested, starting at 1. The default is 1. */
  number: number;
  /** Number of pages that the action can request. */
  totalPages: number;
  /** Total number of operations in all the pages of the response. */
  totalItems: number;
  /**
   * Operations in the page of the response. Pages have between 1 and 180 items,
   * typically depending on the parameter pageSize. By default, pages have 60 items.
   */
  entries: Array<CheckoutOrderOperation>;
};

export type GetOperations = (
  id: number,
  query?: GetOperationsQuery,
  config?: Config,
) => Promise<GetOperationsResponse>;
