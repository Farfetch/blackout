import type { Config, PagedResponse } from '../../../types/index.js';
import type { Order } from '../../../orders/index.js';
import type { Return } from '../../../returns/types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type UserReturnsLegacy = PagedResponse<Return>;

export type GetUserReturnsLegacyQuery = {
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type GetUserReturnsLegacyData = {
  guestUserEmail: string;
  orderId: Order['id'];
};

export type GetUserReturnsLegacy = (
  userId: User['id'],
  data?: GetUserReturnsLegacyData,
  query?: GetUserReturnsLegacyQuery,
  config?: Config,
) => Promise<UserReturnsLegacy>;
