import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserContact } from './index.js';

export type GetUserContact = (
  userId: User['id'],
  contactId: string,
  config?: Config,
) => Promise<UserContact>;
