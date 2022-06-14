import type { Config } from '../../../types';
import type { UserPreferencesResponse } from '.';

export type SetUserPreferencesData = {
  code: string;
  values: string[];
  groupId?: string;
  updatedDate?: string;
}[];

export type SetUserPreferences = (
  id: number,
  data: SetUserPreferencesData,
  config?: Config,
) => Promise<UserPreferencesResponse>;
