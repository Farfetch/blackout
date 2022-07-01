import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact } from './userContact.types';

export type DeleteUserContact = (
  userId: User['id'],
  contactId: UserContact['id'],
  config?: Config,
) => Promise<number>;
