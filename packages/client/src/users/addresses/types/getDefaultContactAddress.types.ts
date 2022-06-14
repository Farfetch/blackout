import type { Address, User } from '.';
import type { Config } from '../../../types';

export type GetUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<Address>;
