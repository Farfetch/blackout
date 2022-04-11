import type { Config } from '../../types';
import type { PostGuestTokenResponse } from './tokens.types';

interface Data {
  guestUserId: number;
  guestUserEmail: string;
  guestUserSecret: string;
}

export type PostGuestTokens = (
  data: Data,
  config: Config,
) => Promise<PostGuestTokenResponse>;
