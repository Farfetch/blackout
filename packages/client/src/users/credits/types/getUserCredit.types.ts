import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';

export type UserCredit = {
  currency: string;
  value: number;
  formattedValue: string;
};

export type GetUserCredit = (
  userId: User['id'],
  config?: Config,
) => Promise<UserCredit[]>;
