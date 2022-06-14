import type { Config } from '../../../types';
import type { UserPersonalIdsResponse } from '.';

export type GetUserPersonalIds = (
  id: number,
  config: Config,
) => Promise<UserPersonalIdsResponse>;
