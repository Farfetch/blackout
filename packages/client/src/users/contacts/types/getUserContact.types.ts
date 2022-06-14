import type { Config } from '../../../types';
import type { GetUserContactQuery } from '../../types/query.types';
import type { UserContactResponse } from '.';

export type GetUserContact = (
  userId: number,
  contactId: string,
  query?: GetUserContactQuery,
  config?: Config,
) => Promise<UserContactResponse>;

export type GetUserContactFixtureParams = {
  userId: number;
  contactId: string;
  query?: GetUserContactQuery;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
