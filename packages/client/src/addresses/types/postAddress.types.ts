import type { Address, User } from '.';
import type { Config } from '../../types';

export type PostAddressProps = {
  userId: User['id'];
};

export type PostAddress = (
  props: PostAddressProps,
  data: Address,
  config?: Config,
) => Promise<Address>;
