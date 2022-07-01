import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserPreference } from '../..';

export type PutUserPreferencesData = Omit<UserPreference, 'updatedDate'>;

export type PutUserPreferences = (
  userId: User['id'],
  data: PutUserPreferencesData,
  config?: Config,
) => Promise<AxiosResponse<void>>;
