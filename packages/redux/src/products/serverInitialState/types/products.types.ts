import type { Model, StoreState } from '../../../types';
import type { ProductsDetailsState, ProductsSizesState } from '../../types';

export type ProductsServerInitialState = (data: {
  // Page model with product details data.
  model: Model;
  // Query parameter to be appended to each product image URL.
  options?: {
    // General options for any modification.
    productImgQueryParam?: string;
  };
}) => {
  details: ProductsDetailsState;
  entities?: StoreState['entities'];
  sizes: ProductsSizesState;
};
