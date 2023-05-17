import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type UserCredit = {
  currency: string;
  value: number;
  formattedValue: string;
};

export type GetUserCredits = (
  userId: User['id'],
  config?: Config,
) => Promise<UserCredit[]>;
