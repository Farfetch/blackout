import type { Config } from '../../types';
import type { PreferencesResponse } from './preferences.types';

export type GetPreferences = (
  id: number,
  code?: string,
  config?: Config,
) => Promise<PreferencesResponse>;
