import type { Config } from '../../types/index.js';

export type DeleteRecentlyViewedProduct = (
  id: number,
  config?: Config,
) => Promise<void>;
