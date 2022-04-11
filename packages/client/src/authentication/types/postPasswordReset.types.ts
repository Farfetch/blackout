import type { AxiosResponse } from 'axios';
import type { Config } from '../../types';

interface Data {
  username: string;
  token: string;
  password: string;
}

export type PostPasswordReset = (
  data: Data,
  config?: Config,
) => Promise<AxiosResponse>;
