import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type PutUserDefaultBillingAddress = (
  userId: User['id'],
  addressId: UserAddress['id'],
  config?: Config,
) => void;
