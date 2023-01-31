/**
 * @module recentlyViewed/actionTypes
 * @category Recently Viewed
 * @subcategory Actions
 */

/** Action type dispatched when the get recently viewed products request fails. */
export const GET_RECENTLY_VIEWED_PRODUCTS_FAILURE =
  '@farfetch/blackout-core/GET_RECENTLY_VIEWED_PRODUCTS_FAILURE';
/** Action type dispatched when the get recently viewed products request starts. */
export const GET_RECENTLY_VIEWED_PRODUCTS_REQUEST =
  '@farfetch/blackout-core/GET_RECENTLY_VIEWED_PRODUCTS_REQUEST';
/** Action type dispatched when the get recently viewed products request succeeds. */
export const GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS =
  '@farfetch/blackout-core/GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS';

/** Action type dispatched by [doSaveRecentlyViewedProduct]{@link module:recentlyViewed/actions.doSaveRecentlyViewedProduct} thunk. */
export const SAVE_RECENTLY_VIEWED_PRODUCT =
  '@farfetch/blackout-core/SAVE_RECENTLY_VIEWED_PRODUCT';

/** Action type dispatched when the delete recently viewed product request fails. */
export const DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE =
  '@farfetch/blackout-core/DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE';
/** Action type dispatched when the delete recently viewed product request starts. */
export const DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST =
  '@farfetch/blackout-core/DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST';
/** Action type dispatched when the delete recently viewed product request succeeds. */
export const DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS =
  '@farfetch/blackout-core/DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS';
