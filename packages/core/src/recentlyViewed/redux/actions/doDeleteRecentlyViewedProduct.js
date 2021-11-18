import * as actionTypes from '../actionTypes';

/**
 * @callback DeleteRecentlyViewedProductThunkFactory
 * @param {number} productId - Identification number of the recently viewed product to delete.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for deleting a recently viewed product, both localy and on the server.
 *
 * @function doDeleteRecentlyViewedProduct
 * @memberof module:recentlyViewed/actions
 *
 * @param {Function} deleteRecentlyViewedProduct - Delete recently viewed client.
 *
 * @returns {DeleteRecentlyViewedProductThunkFactory} Thunk factory.
 */
export default deleteRecentlyViewedProduct =>
  (productId, config) =>
  async dispatch => {
    dispatch({
      meta: { productId },
      type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST,
    });

    try {
      await deleteRecentlyViewedProduct(productId, config);

      dispatch({
        meta: { productId },
        type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE,
      });

      throw error;
    }
  };
