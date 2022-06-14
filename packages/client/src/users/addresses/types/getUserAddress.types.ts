import type { Address, User } from '.';
import type { Config } from '../../../types';

export type GetUserAddressProps = {
  // Identifier of the address.
  id: Address['id'];
  // Identifier of the user.
  userId: User['id'];
};

export type GetUserAddress = (
  props: GetUserAddressProps,
  config?: Config,
) => Promise<Address>;
