import type { Config } from '../../types';

export type DeletePersonalId = (
  userId: number,
  personalId: string,
  config: Config,
) => Promise<number>;
