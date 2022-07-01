import type { Config } from '../../../types';
import type { UserPersonalIdPartial } from './userPersonalId.types';

export type PutUserDefaultPersonalIdData = {
  id: string;
};

export type PutUserDefaultPersonalId = (
  id: number,
  data: PutUserDefaultPersonalIdData,
  config: Config,
) => Promise<UserPersonalIdPartial>;
