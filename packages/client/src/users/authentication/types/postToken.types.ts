import type { Config } from '../../../types/index.js';
import type { Token } from './tokens.types.js';

export type PostTokenData = {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
};

export type PostToken = (
  data: PostTokenData,
  config?: Config,
) => Promise<Token>;
