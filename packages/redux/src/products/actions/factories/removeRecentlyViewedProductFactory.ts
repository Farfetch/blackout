import * as actionTypes from '../../actionTypes';
import {
  DeleteRecentlyViewedProduct,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveRecentlyViewedProductAction } from '../../types';
import type { RemoveRecentlyViewedProductFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client for
 * deleting a recently viewed product, both locally and on the server.
 *
 * @param deleteRecentlyViewedProduct - Delete recently viewed client.
 *
 * @returns Thunk factory.
 */
const removeRecentlyViewedProductFactory: RemoveRecentlyViewedProductFactory<
  DeleteRecentlyViewedProduct
> =
  deleteRecentlyViewedProduct =>
  (productId, config) =>
  async (
    dispatch: Dispatch<RemoveRecentlyViewedProductAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      });

      const result = await deleteRecentlyViewedProduct(productId, config);

      dispatch({
        meta: { productId },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeRecentlyViewedProductFactory;
