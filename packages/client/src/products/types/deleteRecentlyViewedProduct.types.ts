import type { Config } from '../../types';

export type DeleteRecentlyViewedProduct = (
  id: number,
  config?: Config,
) => Promise<void>;
