import type { Config } from '../../types';
import type { OrderSummary } from './orderSummary.types';

export type GetOrders = (
  id: number,
  query?: GetOrdersQuery,
  config?: Config,
) => Promise<OrderSummary>;

export type GetOrdersQuery = {
  page?: number;
  pageSize?: number;
  orderStatuses?: string[];
};
