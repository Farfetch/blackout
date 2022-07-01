import type { Config, UserAddress } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

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
