import type { Model, StoreState } from '../../../types';
import type { State } from '../../types';

export * from './lists.types';
export * from './products.types';

export type ServerInitialState = (data: {
  model: Model;
  options?: { productImgQueryParam?: string };
}) => {
  entities: StoreState['entities'];
  products: Partial<State>;
};
