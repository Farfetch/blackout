import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type DeleteUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => void;
