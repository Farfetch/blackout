import type { Config } from '../../../types';
import type { PatchUserPersonalIdData, PatchUserPersonalIdResponse } from '.';

export type PatchUserPersonalId = (
  userId: number,
  personalId: string,
  data: PatchUserPersonalIdData,
  config: Config,
) => Promise<PatchUserPersonalIdResponse>;
