import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutDefaultBillingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutDefaultBillingAddress = (
  props: PutDefaultBillingAddressProps,
  config?: Config,
) => void;
