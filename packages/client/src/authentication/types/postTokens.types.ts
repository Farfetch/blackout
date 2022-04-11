import type { Config } from '../../types';
import type { PostTokenResponse } from './tokens.types';

interface Data {
  username: string;
  password: string;
  grantType: string;
  refreshToken: string;
}

export type PostTokens = (
  data: Data,
  config: Config,
) => Promise<PostTokenResponse>;
