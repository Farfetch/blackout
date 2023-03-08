import type { Config } from '../../../types/index.js';
import type { Token } from './tokens.types.js';

export interface PostTokenData {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
}

export type PostToken = (
  data: PostTokenData,
  config?: Config,
) => Promise<Token>;
