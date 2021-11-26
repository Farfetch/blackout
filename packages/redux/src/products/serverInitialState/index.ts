/**
 * Products serverInitialState.
 *
 * @module products/serverInitialState
 * @category Products
 * @subcategory ServerInitialState
 */
import listsServerInitialState from './lists';
import productsServerInitialState from './products';
import type { Model, StoreState } from '../../types';

export default ({
  model,
  options,
}: {
  model: Model;
  options?: { productImgQueryParam?: string };
}): {
  entities: StoreState['entities'];
  products: {
    attributes: StoreState['products']['attributes'];
    colorGrouping: StoreState['products']['colorGrouping'];
    details: StoreState['products']['details'];
    fittings: StoreState['products']['fittings'];
    lists: StoreState['products']['lists'];
    measurements: StoreState['products']['measurements'];
    sizeGuides: StoreState['products']['sizeGuides'];
    sizes: StoreState['products']['sizes'];
    variantsByMerchantsLocations: StoreState['products']['variantsByMerchantsLocations'];
  };
} => {
  const { entities: listsEntities, ...listsState } = listsServerInitialState({
    model,
    options,
  });
  const { entities: productsEntities, ...productsState } =
    productsServerInitialState({ model, options });

  return {
    entities: { ...listsEntities, ...productsEntities },
    products: {
      ...listsState,
      ...productsState,
    },
  };
};
