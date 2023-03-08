import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserContact, UserContactRequest } from './userContact.types.js';

export type PostUserContact = (
  userId: User['id'],
  data: UserContactRequest,
  config?: Config,
) => Promise<UserContact>;
