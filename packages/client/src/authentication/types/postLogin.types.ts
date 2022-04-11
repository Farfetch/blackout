import type { Config } from '../../types';
import type { LoginResponse } from './login.types';

export interface LoginData {
  username: string;
  password: string;
  rememberme?: boolean;
}

export type PostLogin = (
  data: LoginData,
  config?: Config,
) => Promise<LoginResponse>;
