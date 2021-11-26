import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client for deleting a recently viewed product, both localy and on the server.
 *
 * @memberof module:recentlyViewed/actions/factories
 *
 * @function removeRecentlyViewedProductFactory
 *
 * @param {Function} deleteRecentlyViewedProduct - Delete recently viewed client.
 *
 * @see {external:removeRecentlyViewedProduct}.
 *
 * @returns {RemoveRecentlyViewedProductThunkFactory} Thunk factory.
 */
export default deleteRecentlyViewedProduct =>
  (productId, config) =>
  async dispatch => {
    dispatch({
      meta: { productId },
      type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
    });

    try {
      await deleteRecentlyViewedProduct(productId, config);

      dispatch({
        meta: { productId },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
      });

      throw error;
    }
  };
