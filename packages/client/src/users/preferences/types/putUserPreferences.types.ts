import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserPreference } from '../../index.js';

export type PutUserPreferencesData = Omit<UserPreference, 'updatedDate'>;

export type PutUserPreferences = (
  userId: User['id'],
  data: PutUserPreferencesData[],
  config?: Config,
) => Promise<AxiosResponse<void>>;
