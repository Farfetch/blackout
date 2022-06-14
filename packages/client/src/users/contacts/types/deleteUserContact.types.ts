import type { Config } from '../../../types';
import type { DeleteUserContactQuery } from '../../types/query.types';
import type { UserContactResponse } from '.';

export type DeleteUserContact = (
  userId: number,
  contactId: string,
  query?: DeleteUserContactQuery,
  config?: Config,
) => Promise<UserContactResponse>;

export type DeleteUserContactFixtureParams = {
  userId: number;
  contactId: string;
  query?: DeleteUserContactQuery;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
