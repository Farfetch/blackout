import type { Config } from '../..';
import type { Outfit } from './productOutfit.types';
import type { Product } from './product.types';

export type GetProductOutfits = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<Outfit[]>;
