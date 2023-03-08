import type { CheckoutOrder } from './checkoutOrder.types.js';
import type { CheckoutOrderOperation } from './checkoutOrderOperation.types.js';
import type { Config, PagedResponse } from '../../types/index.js';

export type GetCheckoutOrderOperationsQuerySort =
  | 'createdDate:desc'
  | 'createdDate:asc';

export type GetCheckoutOrderOperationsQuery = {
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
  sort?: Array<GetCheckoutOrderOperationsQuerySort>;
  /** Operations created in specific time range, specified as a complex filter. Only 'ge' and 'le' are supported. */
  createdDate?: string;
};

export type CheckoutOrderOperations = PagedResponse<CheckoutOrderOperation>;

export type GetCheckoutOrderOperations = (
  checkoutOrderId: CheckoutOrder['id'],
  query?: GetCheckoutOrderOperationsQuery,
  config?: Config,
) => Promise<CheckoutOrderOperations>;
