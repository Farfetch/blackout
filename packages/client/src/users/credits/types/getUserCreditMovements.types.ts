import type { Config, PagedResponse } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type UserCreditMovement = {
  type: number;
  value: number;
  formattedValue: string;
  currency: string;
  description: string;
  createdOn: string;
};

export type GetUserCreditMovementsQuery = {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export type GetUserCreditMovements = (
  userId: User['id'],
  query: GetUserCreditMovementsQuery,
  config?: Config,
) => Promise<PagedResponse<UserCreditMovement>>;
