import type { Config } from '../../../types/index.js';
import type { UserLegacy } from './login.types.js';

export type LoginData = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type PostLogin = (
  data: LoginData,
  config?: Config,
) => Promise<UserLegacy>;
