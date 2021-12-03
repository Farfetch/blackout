import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutDefaultBillingAddressProps = {
  userId: User['id'];
  id: Address['id'];
};

export type PutDefaultBillingAddress = (
  props: PutDefaultBillingAddressProps,
  config?: Config,
) => void;
