import type { Config, PagedResponse } from '../../../types/index.js';
import type { Order } from '../../../orders/index.js';
import type { Return } from '../../../returns/types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type UserReturns = PagedResponse<Return>;

export type GetUserReturnsQuery = {
  page?: number;
  pageSize?: number;
  sort?: string;
  orderId?: Order['id'];
};

export type GetUserReturns = (
  userId: User['id'],
  query?: GetUserReturnsQuery,
  config?: Config,
) => Promise<UserReturns>;
