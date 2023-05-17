import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type GetUserAddressesProps = {
  // Identifier of the user.
  userId: User['id'];
};

export type GetUserAddresses = (
  props: GetUserAddressesProps,
  config?: Config,
) => Promise<UserAddress[]>;
