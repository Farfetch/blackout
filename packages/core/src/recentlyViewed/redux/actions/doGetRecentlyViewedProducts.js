import * as actionTypes from '../actionTypes';
import { areRecentlyViewedProductsFetched } from '../selectors';

// We need to disable jsdoc/no-undefined-types to avoid having
// a warning for the GetRecentlyViewedProductsQuery type.
// This is being done to avoid using the fully qualified
// namepath to reference the GetRecentlyViewedProductsQuery
// and use the @alias defined for that member, which will avoid the HTML for this doc
// to have parts hidden because of the big namepath that would have been used otherwise
// {module:recentlyViewed/actions.GetRecentlyViewedProductsQuery}

/* eslint-disable jsdoc/no-undefined-types */

/**
 * @callback GetRecentlyViewedProductsThunkFactory
 *
 * @alias GetRecentlyViewedProductsThunkFactory
 * @memberof module:recentlyViewed/actions
 *
 * @param {GetRecentlyViewedProductsQuery} [query] - Query parameter to be passed to the client,
 * containing all values to add to the query parameter.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/* eslint-enable jsdoc/no-undefined-types */

/**
 * Method responsible for retrieving recently viewed products.
 *
 * @function doGetRecentlyViewedProducts
 * @memberof module:recentlyViewed/actions
 *
 * @param {Function} getRecentlyViewedProducts - Get recently viewed products client.
 *
 * @returns {GetRecentlyViewedProductsThunkFactory} Thunk factory.
 */
export default getRecentlyViewedProducts =>
  (query, config) =>
  async (dispatch, getState) => {
    if (areRecentlyViewedProductsFetched(getState())) {
      console.warn(`
            @farfetch/blackout-core/recentlyViewed - Seems you are trying to fetch recently viewed products more than once.
            Please make sure you only request the products once, and use the "doSaveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
            Keep in mind that "doSaveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server. 
            For that, make sure you are using analytics with Omnitracking integration.
        `);
    }

    dispatch({
      type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_REQUEST,
    });

    try {
      const result = await getRecentlyViewedProducts(query, config);

      dispatch({
        type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: { error },
      });

      throw error;
    }
  };
