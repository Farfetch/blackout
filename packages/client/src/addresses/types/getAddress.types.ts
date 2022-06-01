import type { Address, User } from '.';
import type { Config } from '../../types';

export type GetAddressProps = {
  // Identifier of the address.
  id: Address['id'];
  // Identifier of the user.
  userId: User['id'];
};

export type GetAddress = (
  props: GetAddressProps,
  config?: Config,
) => Promise<Address>;
