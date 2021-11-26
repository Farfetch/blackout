import { createSelector } from 'reselect';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Gets the related sets of a specific type from a given product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product id to get the related sets from.
 * @param {number} setType - Desired set type to filter.
 *
 * @returns {Array} Related sets of the given type.
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
