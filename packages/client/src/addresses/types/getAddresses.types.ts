import type { Address, User } from '.';
import type { Config } from '../../types';

export type GetAddressesProps = {
  userId: User['id'];
};

export type GetAddresses = (
  props: GetAddressesProps,
  config?: Config,
) => Promise<Address[]>;
