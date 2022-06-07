import type { Config } from '../../types';

export type DeleteTokens = (
  id: string | number,
  config?: Config,
) => Promise<number>;
