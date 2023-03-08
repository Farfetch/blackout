import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type GetUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<UserAddress>;
