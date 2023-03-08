import type { Config } from '../../types/index.js';
import type { Orders } from '../../orders/types/index.js';
import type { User } from '../../users/authentication/types/user.types.js';

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
