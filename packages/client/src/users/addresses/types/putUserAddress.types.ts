import type { Address, User } from '.';
import type { Config } from '../../../types';

export type PutUserAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutUserAddress = (
  props: PutUserAddressProps,
  data: Address,
  config?: Config,
) => Promise<Address>;
