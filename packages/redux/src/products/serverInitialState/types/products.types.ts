import type { Model, StoreState } from '../../../types';
import type { ProductsDetailsState, ProductsSizesState } from '../../types';

export type ProductsServerInitialState = (data: {
  model: Model;
  options?: { productImgQueryParam?: string };
}) => {
  details: ProductsDetailsState;
  entities?: StoreState['entities'];
  sizes: ProductsSizesState;
};
