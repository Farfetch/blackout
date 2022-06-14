import type { Config } from '../../../types';
import type { GetUserContactsQuery } from '../../types/query.types';
import type { UserContactResponse } from '.';

export type GetUserContacts = (
  userId: number,
  query?: GetUserContactsQuery,
  config?: Config,
) => Promise<UserContactResponse>;

export type GetUserContactsFixtureParams = {
  userId: number;
  query?: GetUserContactsQuery;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
