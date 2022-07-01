import type { Config } from '../../../types';

export type DeleteUserImpersonation = (
  id: string,
  config?: Config,
) => Promise<number>;
