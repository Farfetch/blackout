import type { Address, User } from '.';
import type { Config } from '../../types';

export type PutDefaultContactAddress = (
  userId: User['id'],
  addressId: Address['id'],
  config?: Config,
) => void;
