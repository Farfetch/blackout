import type { Config } from '../../types';
import type { PreferencesResponse } from './preferences.types';

export type SetPreferencesData = [
  {
    code: string;
    values: string[];
    groupId: string;
    updatedDate: string;
  },
];

export type SetPreferences = (
  id: number,
  data: SetPreferencesData,
  config?: Config,
) => Promise<PreferencesResponse>;
