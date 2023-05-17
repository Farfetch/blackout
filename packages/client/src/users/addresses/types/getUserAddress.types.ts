import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type GetUserAddressProps = {
  // Identifier of the address.
  id: UserAddress['id'];
  // Identifier of the user.
  userId: User['id'];
};

export type GetUserAddress = (
  props: GetUserAddressProps,
  config?: Config,
) => Promise<UserAddress>;
