import type { Address, User } from '.';
import type { Config } from '../../../types';

export type PutUserDefaultShippingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutUserDefaultShippingAddress = (
  props: PutUserDefaultShippingAddressProps,
  config?: Config,
) => void;
