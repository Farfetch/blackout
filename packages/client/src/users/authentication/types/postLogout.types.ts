import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';

export type PostLogout = (config?: Config) => Promise<AxiosResponse>;
