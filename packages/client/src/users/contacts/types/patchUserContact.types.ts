import type { Config } from '../../../types';
import type { PatchUserContactQuery } from '../../types/query.types';
import type { UserContactResponse } from '.';

export type PatchUserContactData = {
  value: string;
  path: string;
  op: string;
  from: string;
};

export type PatchUserContact = (
  userId: number,
  contactId: string,
  data: PatchUserContactData,
  query?: PatchUserContactQuery,
  config?: Config,
) => Promise<UserContactResponse>;

export type PatchUserContactFixtureParams = {
  userId: number;
  contactId: string;
  data?: PatchUserContactData;
  query?: PatchUserContactQuery;
  config?: Config;
  response?: UserContactResponse | Record<string, unknown>;
};
