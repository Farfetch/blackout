/**
 * @module recentlyViewed/actionTypes
 * @category Recently Viewed
 * @subcategory Actions
 */

/** Action type dispatched when the fetch recently viewed products request fails. */
export const FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE =
  '@farfetch/blackout-redux/FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE';
/** Action type dispatched when the fetch recently viewed products request starts. */
export const FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST =
  '@farfetch/blackout-redux/FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST';
/** Action type dispatched when the fetch recently viewed products request succeeds. */
export const FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS =
  '@farfetch/blackout-redux/FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS';

/** Action type dispatched by [saveRecentlyViewedProduct]{@link module:recentlyViewed/actions.saveRecentlyViewedProduct} thunk. */
export const SAVE_RECENTLY_VIEWED_PRODUCT =
  '@farfetch/blackout-redux/SAVE_RECENTLY_VIEWED_PRODUCT';

/** Action type dispatched when the remove recently viewed product request fails. */
export const REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE =
  '@farfetch/blackout-redux/REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE';
/** Action type dispatched when the remove recently viewed product request starts. */
export const REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST =
  '@farfetch/blackout-redux/REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST';
/** Action type dispatched when the remove recently viewed product request succeeds. */
export const REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS =
  '@farfetch/blackout-redux/REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS';
