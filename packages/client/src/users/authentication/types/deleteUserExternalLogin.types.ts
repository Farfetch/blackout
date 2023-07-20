import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type DeleteUserExternalLogin = (
  userId: User['id'],
  externalLoginId: string,
  config?: Config,
) => Promise<number>;
