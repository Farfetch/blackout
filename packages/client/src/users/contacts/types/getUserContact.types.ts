import type { Config } from '../../../types';
import type { UserContactResponse } from '.';

export type GetUserContact = (
  userId: number,
  contactId: string,
  config?: Config,
) => Promise<UserContactResponse>;

export type GetUserContactFixtureParams = {
  userId: number;
  contactId: string;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
