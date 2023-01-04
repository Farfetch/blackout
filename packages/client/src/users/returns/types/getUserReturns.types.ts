import type { Config, PagedResponse } from '../../../types';
import type { Return } from '../../../returns/types';
import type { User } from '../../authentication/types/user.types';

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
