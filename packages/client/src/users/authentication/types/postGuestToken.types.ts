import type { Config } from '../../../types';
import type { PostGuestTokenResponse } from './tokens.types';

interface Data {
  guestUserId: number;
  guestUserEmail: string;
  guestUserSecret: string;
}

export type PostGuestToken = (
  data: Data,
  config?: Config,
) => Promise<PostGuestTokenResponse>;
