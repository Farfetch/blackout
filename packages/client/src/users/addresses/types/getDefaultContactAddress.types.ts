import type { Config, UserAddress } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type GetUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<UserAddress>;
