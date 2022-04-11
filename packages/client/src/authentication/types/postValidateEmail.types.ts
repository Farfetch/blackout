import type { AxiosResponse } from 'axios';
import type { Config } from '../../types';

interface Data {
  username: string;
  token: string;
}

export type PostValidateEmail = (
  data: Data,
  config?: Config,
) => Promise<AxiosResponse>;
