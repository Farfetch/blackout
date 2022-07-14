import type { Config } from '../../../types';
import type { UserContactResponse } from '.';

export type GetUserContact = (
  userId: number,
  contactId: string,
  config?: Config,
) => Promise<UserContactResponse>;
