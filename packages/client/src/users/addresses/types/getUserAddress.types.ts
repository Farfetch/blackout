import type { Config, UserAddress } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

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
