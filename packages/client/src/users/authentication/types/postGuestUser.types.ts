import type { Config } from '../../../types/index.js';
import type { GuestUser } from './guestUser.types.js';

export type PostGuestUserData = {
  countryCode: string;
  ip: string;
  externalId?: string;
  friendId?: string;
};

export type PostGuestUser = (
  data: PostGuestUserData,
  config?: Config,
) => Promise<GuestUser>;
