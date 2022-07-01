import type { LocaleState } from '../locale';
import type { Model } from './model.types';
import type { ProductsState } from '../products';
import type { StoreState } from './storeState.types';

export type ServerInitialState = (data: {
  model: Model;
  options?: { productImgQueryParam?: string };
}) => Omit<StoreState, 'products' | 'locale'> & {
  products?: Partial<ProductsState>;
  locale?: Partial<LocaleState>;
};
