import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserContact } from './index.js';

export type GetUserContacts = (
  userId: User['id'],
  config?: Config,
) => Promise<UserContact[]>;
