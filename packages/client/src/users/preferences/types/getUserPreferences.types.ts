import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserPreference } from './userPreferences.types';

export type GetUserPreferences = (
  userId: User['id'],
  code?: string,
  config?: Config,
) => Promise<UserPreference[]>;
