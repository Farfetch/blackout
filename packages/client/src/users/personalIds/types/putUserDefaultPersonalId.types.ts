import type { Config } from '../../../types/index.js';
import type { UserPersonalIdPartial } from './userPersonalId.types.js';

export type PutUserDefaultPersonalIdData = {
  id: string;
};

export type PutUserDefaultPersonalId = (
  id: number,
  data: PutUserDefaultPersonalIdData,
  config: Config,
) => Promise<UserPersonalIdPartial>;
