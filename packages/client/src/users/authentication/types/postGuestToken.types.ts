import type { Config } from '../../../types/index.js';
import type { GuestToken } from './tokens.types.js';

export interface PostGuestTokenData {
  guestUserId?: number;
  guestUserEmail?: string;
  guestUserSecret?: string;
}

export type PostGuestToken = (
  data: PostGuestTokenData,
  config?: Config,
) => Promise<GuestToken>;
