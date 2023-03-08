import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserPreference } from './userPreferences.types.js';

export type GetUserPreferences = (
  userId: User['id'],
  code?: string,
  config?: Config,
) => Promise<UserPreference[]>;
