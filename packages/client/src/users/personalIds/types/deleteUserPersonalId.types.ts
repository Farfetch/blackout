import type { Config } from '../../../types';

export type DeleteUserPersonalId = (
  userId: number,
  personalId: string,
  config: Config,
) => Promise<number>;
