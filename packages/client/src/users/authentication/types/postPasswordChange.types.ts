import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';

export interface PostPasswordChangeData {
  oldPassword: string;
  newPassword: string;
  userId: number;
  username: string;
}

export type PostPasswordChange = (
  data: PostPasswordChangeData,
  config?: Config,
) => Promise<AxiosResponse>;
