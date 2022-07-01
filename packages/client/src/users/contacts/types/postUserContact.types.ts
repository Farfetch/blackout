import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact, UserContactRequest } from './userContact.types';

export type PostUserContact = (
  userId: User['id'],
  data: UserContactRequest,
  config?: Config,
) => Promise<UserContact>;
