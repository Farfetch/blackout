import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export interface PostRefreshEmailTokenData {
  username: string;
}

export type PostRefreshEmailToken = (
  data: PostRefreshEmailTokenData,
  config?: Config,
) => Promise<AxiosResponse>;
