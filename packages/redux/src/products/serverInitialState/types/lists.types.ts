import type { Model, StoreState } from '../../../types';
import type { ProductsListsState } from '../../types';

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
