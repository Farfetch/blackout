import type { Address, User } from '.';
import type { Config } from '../../../types';

export type GetUserAddressesProps = {
  // Identifier of the user.
  userId: User['id'];
};

export type GetUserAddresses = (
  props: GetUserAddressesProps,
  config?: Config,
) => Promise<Address[]>;
