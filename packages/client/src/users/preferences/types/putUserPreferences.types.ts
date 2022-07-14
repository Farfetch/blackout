import type { Config } from '../../../types';
import type { UserPreferencesResponse } from './userPreferences.types';

export type PutUserPreferencesData = {
  code: string;
  values: string[];
  groupId?: string;
  updatedDate?: string;
}[];

export type PutUserPreferences = (
  id: number,
  data: PutUserPreferencesData,
  config?: Config,
) => Promise<UserPreferencesResponse>;
