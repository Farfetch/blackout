import type { Config } from '../../types';
import type { GuestUserResponse } from './guestUser.types';

export type GetGuestUser = (
  id: number,
  config?: Config,
) => Promise<GuestUserResponse>;
