import type { Config } from '../../../types/index.js';
import type { LoginResponse } from './login.types.js';

export type LoginData = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type PostLogin = (
  data: LoginData,
  config?: Config,
) => Promise<LoginResponse>;
