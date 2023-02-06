import type { Config } from '../../types/index.js';
import type { OrderSummaries } from './orderSummary.types.js';
import type { User } from '../../users/authentication/types/user.types.js';

export type GetUserOrders = (
  id: User['id'],
  query?: GetUserOrdersQuery,
  config?: Config,
) => Promise<OrderSummaries>;

export type GetUserOrdersQuery = {
  page?: number;
  pageSize?: number;
  orderStatuses?: string[];
};
