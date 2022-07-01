import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';
import type { UserContactResponse } from '.';

export type DeleteUserContact = (
  userId: number,
  contactId: string,
  config?: Config,
) => Promise<AxiosResponse<void>>;

export type DeleteUserContactFixtureParams = {
  userId: number;
  contactId: string;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
