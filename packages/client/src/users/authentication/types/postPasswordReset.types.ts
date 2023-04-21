import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export type PostPasswordResetData = {
  username: string;
  token: string;
  password: string;
};

export type PostPasswordReset = (
  data: PostPasswordResetData,
  config?: Config,
) => Promise<AxiosResponse>;
