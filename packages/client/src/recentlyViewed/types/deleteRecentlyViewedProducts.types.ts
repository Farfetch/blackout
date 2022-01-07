import type { Config } from '../../types';

export type DeleteRecentlyViewedProducts = (
  id: number,
  config?: Config,
) => Promise<void>;
