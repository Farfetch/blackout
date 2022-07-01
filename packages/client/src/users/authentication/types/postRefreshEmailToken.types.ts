import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';

export interface PostRefreshEmailTokenData {
  username: string;
}

export type PostRefreshEmailToken = (
  data: PostRefreshEmailTokenData,
  config?: Config,
) => Promise<AxiosResponse>;
