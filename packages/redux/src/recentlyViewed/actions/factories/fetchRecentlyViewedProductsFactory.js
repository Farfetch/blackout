import * as actionTypes from '../../actionTypes';
import { areRecentlyViewedProductsFetched } from '../../';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client for retrieving recently viewed products.
 *
 * @memberof module:recentlyViewed/actions/factories
 *
 * @function fetchRecentlyViewedProductsFactory
 *
 * @param {Function} getRecentlyViewedProducts - Get recently viewed products client.
 *
 * @returns {FetchRecentlyViewedProductsThunkFactory} Thunk factory.
 */
export default getRecentlyViewedProducts =>
  (query, config) =>
  async (dispatch, getState) => {
    if (areRecentlyViewedProductsFetched(getState())) {
      console.warn(`
            @farfetch/blackout-redux/recentlyViewed - Seems you are trying to fetch recently viewed products more than once.
            Please make sure you only request the products once, and use the "saveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
            Keep in mind that "saveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server.
            For that, make sure you are using analytics with Omnitracking integration.
        `);
    }

    dispatch({
      type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
    });

    try {
      const result = await getRecentlyViewedProducts(query, config);

      dispatch({
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: { error },
      });

      throw error;
    }
  };
