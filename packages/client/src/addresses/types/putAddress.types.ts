import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutAddressProps = {
  userId: User['id'];
  id: Address['id'];
};

export type PutAddress = (
  props: PutAddressProps,
  data: Address,
  config?: Config,
) => Promise<Address>;
