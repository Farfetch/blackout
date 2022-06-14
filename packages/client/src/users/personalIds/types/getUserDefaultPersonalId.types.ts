import type { Config } from '../../../types';
import type { UserDefaultPersonalIdResponse } from '.';

export type GetUserDefaultPersonalId = (
  id: number,
  config: Config,
) => Promise<UserDefaultPersonalIdResponse>;
