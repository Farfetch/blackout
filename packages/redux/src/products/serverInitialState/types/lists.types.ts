import type { Model, StoreState } from '../../../types';
import type { ProductsListsState } from '../../types';

export type ListsServerInitialState = (data: {
  model: Model;
  options?: { productImgQueryParam?: string };
}) => {
  lists: ProductsListsState;
  entities?: StoreState['entities'];
};
