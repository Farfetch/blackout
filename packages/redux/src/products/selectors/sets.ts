import { createSelector } from 'reselect';
import { getProduct } from './product';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Gets the related sets of a specific type from a given product.
 *
 * @param state     - Application state.
 * @param productId - Product id to get the related sets from.
 * @param setType   - Desired set type to filter.
 *
 * @returns Related sets of the given type.
 */
export const getProductRelatedSetsIdsByType = createSelector(
  (state: StoreState, productId: ProductEntity['id']) =>
    getProduct(state, productId),
  (state: StoreState, productId: ProductEntity['id'], setType: number) =>
    setType,
  (product, setType) => {
    const relatedSetsIds = product?.relatedSets || [];

    return relatedSetsIds.reduce((acc: number[], relatedSet) => {
      if (relatedSet.setType === setType) {
        acc.push(relatedSet.setId);
      }

      return acc;
    }, []);
  },
);
