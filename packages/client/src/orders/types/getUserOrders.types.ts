import type { Config } from '../../types';
import type { Orders } from '../../orders/types';
import type { User } from '../../users/authentication/types/user.types';

export type GetUserOrders = (
  id: User['id'],
  query?: GetUserOrdersQuery,
  config?: Config,
) => Promise<Orders>;

export type GetUserOrdersQuery = {
  page?: number;
  pageSize?: number;
  orderStatuses?: string[];
};
