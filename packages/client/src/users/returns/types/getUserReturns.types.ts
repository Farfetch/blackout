import type { Config, PagedResponse } from '../../../types/index.js';
import type { Return } from '../../../returns/types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type UserReturns = PagedResponse<Return>;

export type QuerySearchUserReturns = {
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type GetUserReturns = (
  userId: User['id'],
  query?: QuerySearchUserReturns,
  config?: Config,
) => Promise<UserReturns>;
