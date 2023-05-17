import type { LocaleState } from '../locale/index.js';
import type { Model } from './model.types.js';
import type { ProductsState } from '../products/index.js';
import type { StoreState } from './storeState.types.js';

export type ServerInitialState = (data: {
  model: Model;
  options?: { productImgQueryParam?: string };
}) => Omit<StoreState, 'products' | 'locale'> & {
  products?: Partial<ProductsState>;
  locale?: Partial<LocaleState>;
};
