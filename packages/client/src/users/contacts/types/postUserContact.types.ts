import type { Config } from '../../../types';
import type { PostUserContactQuery } from '../../types/query.types';
import type { UserContact, UserContactResponse } from './userContact.types';

export type PostUserContact = (
  userId: number,
  data: UserContact,
  query?: PostUserContactQuery,
  config?: Config,
) => Promise<UserContactResponse>;

export type PostUserContactFixtureParams = {
  userId: number;
  data?: UserContact;
  query?: PostUserContactQuery;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
