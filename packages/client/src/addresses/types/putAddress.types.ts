import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutAddress = (
  props: PutAddressProps,
  data: Address,
  config?: Config,
) => Promise<Address>;
