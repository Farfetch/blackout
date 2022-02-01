import type { OrderSummary } from './orderSummary.types';

export type GetOrders = (
  id: number,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<OrderSummary>;

export type Query = {
  page?: number;
  pageSize?: number;
  orderStatuses?: string[];
};
