import type { Config } from '../../../types';
import type { UserContact, UserContactResponse } from './userContact.types';

export type PostUserContact = (
  userId: number,
  data: UserContact,
  config?: Config,
) => Promise<UserContactResponse>;
