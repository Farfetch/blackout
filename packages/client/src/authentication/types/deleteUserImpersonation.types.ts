import type { Config } from '../../types';

export type DeleteUserImpersonation = (
  id: number,
  config?: Config,
) => Promise<number>;
