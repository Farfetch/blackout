import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutDefaultShippingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutDefaultShippingAddress = (
  props: PutDefaultShippingAddressProps,
  config?: Config,
) => void;
