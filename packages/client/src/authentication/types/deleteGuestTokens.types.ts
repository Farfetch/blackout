import type { Config } from '../../types';

export type DeleteGuestTokens = (
  id: string,
  config?: Config,
) => Promise<number>;
