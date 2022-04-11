import type { AxiosResponse } from 'axios';
import type { Config } from '../../types';

interface Data {
  oldPassword: string;
  newPassword: string;
  userId: number;
  username: string;
}

export type PostPasswordChange = (
  data: Data,
  config?: Config,
) => Promise<AxiosResponse>;
