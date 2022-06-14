import type { Config } from '../../../types';
import type { PutUserDefaultPersonalIdResponse } from '.';

export type PutUserDefaultPersonalIdData = {
  id: string;
};

export type PutUserDefaultPersonalId = (
  id: number,
  data: PutUserDefaultPersonalIdData,
  config: Config,
) => Promise<PutUserDefaultPersonalIdResponse>;
