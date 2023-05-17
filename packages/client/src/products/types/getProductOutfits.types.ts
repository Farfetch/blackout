import type { Config } from '../../index.js';
import type { Outfit } from './productOutfit.types.js';
import type { Product } from './product.types.js';

export type GetProductOutfits = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<Outfit[]>;
