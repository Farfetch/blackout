import type { Address, User } from '.';
import type { Config } from '../../types';

export type GetAddressProps = {
  id: Address['id'];
  userId: User['id'];
};

export type GetAddress = (
  props: GetAddressProps,
  config?: Config,
) => Promise<Address>;
