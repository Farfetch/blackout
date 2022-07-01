import type { Config } from '../../../types';
import type { GuestUser } from './guestUser.types';
import type { User } from './user.types';

export type GetGuestUser = (
  guestUserId: User['id'],
  config?: Config,
) => Promise<GuestUser>;
