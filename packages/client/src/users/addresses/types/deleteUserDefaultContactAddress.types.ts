import type { Config } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type DeleteUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => void;
