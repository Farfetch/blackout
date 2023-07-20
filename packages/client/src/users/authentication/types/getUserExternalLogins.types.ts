import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type ExternalLogin = {
  id: string;
  provider: string;
  providerUserId: string;
};

export type GetUserExternalLogins = (
  userId: User['id'],
  config?: Config,
) => Promise<ExternalLogin[]>;
