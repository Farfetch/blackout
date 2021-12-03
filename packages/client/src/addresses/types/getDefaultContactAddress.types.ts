import type { Address, User } from '.';
import type { Config } from '../../types';

export type GetDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<Address>;
