import type { Config } from '../../../types';
import type { UserPersonalIdResponse } from '.';

export type GetUserPersonalId = (
  userId: number,
  personalId: string,
  config: Config,
) => Promise<UserPersonalIdResponse>;
