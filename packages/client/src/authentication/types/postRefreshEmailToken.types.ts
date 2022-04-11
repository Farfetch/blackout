import type { AxiosResponse } from 'axios';
import type { Config } from '../../types';

interface Data {
  username: string;
}

export type PostRefreshEmailToken = (
  data: Data,
  config?: Config,
) => Promise<AxiosResponse>;
