import type { Config } from '../../../types';
import type { UserPreferencesResponse } from './userPreferences.types';

export type GetUserPreferences = (
  id: number,
  code?: string,
  config?: Config,
) => Promise<UserPreferencesResponse>;
