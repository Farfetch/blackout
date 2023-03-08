import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export interface PostPasswordRecoverData {
  username: string;
}

export type PostPasswordRecover = (
  data: PostPasswordRecoverData,
  config?: Config,
) => Promise<AxiosResponse>;
