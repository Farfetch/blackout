import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact } from '.';

export type GetUserContact = (
  userId: User['id'],
  contactId: string,
  config?: Config,
) => Promise<UserContact>;
