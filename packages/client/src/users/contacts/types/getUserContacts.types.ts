import type { Config } from '../../../types';
import type { UserContactResponse } from '.';

export type GetUserContacts = (
  userId: number,
  config?: Config,
) => Promise<UserContactResponse[]>;
