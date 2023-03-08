import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type PutUserDefaultShippingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: UserAddress['id'];
};

export type PutUserDefaultShippingAddress = (
  props: PutUserDefaultShippingAddressProps,
  config?: Config,
) => void;
