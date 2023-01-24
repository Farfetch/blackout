import type { Config, UserAddress } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type PutUserDefaultBillingAddress = (
  userId: User['id'],
  addressId: UserAddress['id'],
  config?: Config,
) => void;
