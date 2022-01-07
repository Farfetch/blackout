import * as actionTypes from '../actionTypes';

/**
 * @callback SaveRecentlyViewedProductThunkFactory
 * @param {number} productId - The id of the product to be added to the recently viewed list.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for saving a product on the store to mark it as recently viewed.
 * This action will not persist the data on the server.
 * For that, we need to use @farfetch/blackout-react/analytics (for web) or @farfetch/blackout-react-native-analytics (for mobile apps) Omnitracking integration.
 *
 * @function saveRecentlyViewedProduct
 * @memberof module:recentlyViewed/actions
 *
 *
 * @returns {SaveRecentlyViewedProductThunkFactory} Thunk factory.
 */
export default () => productId => dispatch => {
  const payload = [
    {
      productId: Number(productId),
      lastVisitDate: new Date().toISOString(),
    },
  ];
  dispatch({
    type: actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
    payload,
  });
};
