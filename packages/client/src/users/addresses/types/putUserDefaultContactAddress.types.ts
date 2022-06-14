import type { Address, User } from '.';
import type { Config } from '../../../types';

export type PutUserDefaultContactAddress = (
  userId: User['id'],
  addressId: Address['id'],
  config?: Config,
) => void;
