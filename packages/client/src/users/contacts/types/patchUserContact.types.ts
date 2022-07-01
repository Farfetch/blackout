import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact } from '.';

export type PatchUserContactOperation = {
  value?: string;
  path: string;
  op: string;
  from?: string;
};

export type PatchUserContact = (
  userId: User['id'],
  contactId: string,
  data: PatchUserContactOperation[],
  config?: Config,
) => Promise<UserContact>;
