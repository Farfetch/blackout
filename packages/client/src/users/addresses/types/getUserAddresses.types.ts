import type { Config, UserAddress } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type GetUserAddressesProps = {
  // Identifier of the user.
  userId: User['id'];
};

export type GetUserAddresses = (
  props: GetUserAddressesProps,
  config?: Config,
) => Promise<UserAddress[]>;
