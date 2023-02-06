import type { Config } from '../../types';
import type { OrderSummaries } from './orderSummary.types';
import type { User } from '../../users/authentication/types/user.types';

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
