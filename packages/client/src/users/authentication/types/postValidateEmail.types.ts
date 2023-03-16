import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export interface PostValidateEmailData {
  username: string;
  token: string;
}

export type PostValidateEmail = (
  data: PostValidateEmailData,
  config?: Config,
) => Promise<AxiosResponse>;
