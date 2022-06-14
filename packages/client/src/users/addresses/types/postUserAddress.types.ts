import type { Address, User } from '.';
import type { Config } from '../../../types';

export type PostUserAddressProps = {
  // Identifier of the user.
  userId: User['id'];
};

export type PostUserAddress = (
  props: PostUserAddressProps,
  data: Address,
  config?: Config,
) => Promise<Address>;
