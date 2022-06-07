import type { Config } from '../../types';
import type { PostTokenResponse } from './tokens.types';

export interface PostTokensData {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
}

export type PostTokens = (
  data: PostTokensData,
  config?: Config,
) => Promise<PostTokenResponse>;
