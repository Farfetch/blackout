import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact } from '.';

export type GetUserContacts = (
  userId: User['id'],
  config?: Config,
) => Promise<UserContact[]>;
