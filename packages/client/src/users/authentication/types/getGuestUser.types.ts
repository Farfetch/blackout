import type { Config } from '../../../types/index.js';
import type { GuestUser } from './guestUser.types.js';
import type { User } from './user.types.js';

export type GetGuestUser = (
  guestUserId: User['id'],
  config?: Config,
) => Promise<GuestUser>;
