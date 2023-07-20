import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export type PostSocialLoginData = {
  provider: string;
  socialAccessToken: string;
  rememberMe: boolean;
  countryCode: string;
};

export type PostSocialLogin = (
  data: PostSocialLoginData,
  config?: Config,
) => Promise<User>;
