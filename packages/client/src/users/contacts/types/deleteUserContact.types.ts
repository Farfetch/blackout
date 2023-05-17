import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserContact } from './userContact.types.js';

export type DeleteUserContact = (
  userId: User['id'],
  contactId: UserContact['id'],
  config?: Config,
) => Promise<number>;
