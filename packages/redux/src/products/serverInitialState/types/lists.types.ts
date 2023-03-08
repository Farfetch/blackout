import type { Model, StoreState } from '../../../types/index.js';
import type { ProductsListsState } from '../../types/index.js';

export type ListsServerInitialState = (data: {
  // Page model with products list (listing or sets) data.
  model: Model;
  // General options for any modification.
  options?: {
    // Query parameter to be appended to each product image URL.
    productImgQueryParam?: string;
  };
}) => {
  lists: ProductsListsState;
  entities?: StoreState['entities'];
};
