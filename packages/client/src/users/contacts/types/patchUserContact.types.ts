import type { Config } from '../../../types';
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
  config?: Config,
) => Promise<UserContactResponse>;
