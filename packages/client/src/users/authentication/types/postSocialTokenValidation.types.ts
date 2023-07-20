import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export type PostSocialTokenValidationData = {
  token: string;
  tokenTypeHint: string;
};

export type PostSocialTokenValidation = (
  data: PostSocialTokenValidationData,
  config?: Config,
) => Promise<User>;
