import type { Config } from '../../../types';
import type { PostTokenResponse } from './tokens.types';

export interface PostTokenData {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
}

export type PostToken = (
  data: PostTokenData,
  config?: Config,
) => Promise<PostTokenResponse>;
