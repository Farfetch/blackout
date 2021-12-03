import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutDefaultShippingAddressProps = {
  userId: User['id'];
  id: Address['id'];
};

export type PutDefaultShippingAddress = (
  props: PutDefaultShippingAddressProps,
  config?: Config,
) => void;
