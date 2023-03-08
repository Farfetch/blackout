import type { Config } from '../../../types/index.js';
import type { GuestToken } from './tokens.types.js';

interface Data {
  guestUserId?: number;
  guestUserEmail?: string;
  guestUserSecret?: string;
}

export type PostGuestToken = (
  data: Data,
  config?: Config,
) => Promise<GuestToken>;
