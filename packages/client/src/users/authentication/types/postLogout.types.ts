import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export type PostLogout = (config?: Config) => Promise<AxiosResponse>;
