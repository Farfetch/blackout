import type { CommercePagesRankingStrategy } from '../contents/types/commercePagesRankingStrategy.types.js';
import type { LocaleState } from '../locale/index.js';
import type { Model } from './model.types.js';
import type { ProductsState } from '../products/index.js';
import type { StoreState } from './storeState.types.js';

export type ServerInitialState = (data: {
  model: Model;
  strategy?: CommercePagesRankingStrategy;
  options?: { productImgQueryParam?: string };
}) => Omit<StoreState, 'products' | 'locale'> & {
  products?: Partial<ProductsState>;
  locale?: Partial<LocaleState>;
};
