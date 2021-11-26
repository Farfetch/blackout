/**
 * @module products/actionTypes
 * @category Products
 * @subcategory Actions types
 */

// Details

/** Action type dispatched when the dehydrate product details occurs. */
export const DEHYDRATE_PRODUCT_DETAILS =
  '@farfetch/blackout-redux/DEHYDRATE_PRODUCT_DETAILS';

/** Action type dispatched when the fetch color grouping request fails. */
export const FETCH_PRODUCT_COLOR_GROUPING_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_COLOR_GROUPING_FAILURE';
/** Action type dispatched when the fetch color grouping request starts. */
export const FETCH_PRODUCT_COLOR_GROUPING_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_COLOR_GROUPING_REQUEST';
/** Action type dispatched when the fetch color grouping request succeeds. */
export const FETCH_PRODUCT_COLOR_GROUPING_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_COLOR_GROUPING_SUCCESS';

/** Action type dispatched when the fetch measurements request fails. */
export const FETCH_PRODUCT_MEASUREMENTS_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MEASUREMENTS_FAILURE';
/** Action type dispatched when the fetch measurements request starts. */
export const FETCH_PRODUCT_MEASUREMENTS_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MEASUREMENTS_REQUEST';
/** Action type dispatched when the fetch measurements request succeeds. */
export const FETCH_PRODUCT_MEASUREMENTS_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MEASUREMENTS_SUCCESS';

/** Action type dispatched when the fetch product attributes request fails. */
export const FETCH_PRODUCT_ATTRIBUTES_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_ATTRIBUTES_FAILURE';
/** Action type dispatched when the fetch product attributes request starts. */
export const FETCH_PRODUCT_ATTRIBUTES_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_ATTRIBUTES_REQUEST';
/** Action type dispatched when the fetch product attributes request succeeds. */
export const FETCH_PRODUCT_ATTRIBUTES_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_ATTRIBUTES_SUCCESS';

/** Action type dispatched when the fetch product details request fails. */
export const FETCH_PRODUCT_DETAILS_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_DETAILS_FAILURE';
/** Action type dispatched when the fetch product details request starts. */
export const FETCH_PRODUCT_DETAILS_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_DETAILS_REQUEST';
/** Action type dispatched when the fetch product details request succeeds. */
export const FETCH_PRODUCT_DETAILS_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_DETAILS_SUCCESS';

/** Action type dispatched when the fetch product merchants locations request
 * fails.
 */
export const FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE';
/** Action type dispatched when the fetch product merchants locations request
 * starts.
 */
export const FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST';
/** Action type dispatched when the fetch product merchants locations request
 * succeeds.
 */
export const FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS';

/** Action type dispatched when the fetch product size guides request fails. */
export const FETCH_PRODUCT_SIZEGUIDES_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZEGUIDES_FAILURE';
/** Action type dispatched when the fetch product size guides request starts. */
export const FETCH_PRODUCT_SIZEGUIDES_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZEGUIDES_REQUEST';
/** Action type dispatched when the fetch product size guides request succeeds. */
export const FETCH_PRODUCT_SIZEGUIDES_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZEGUIDES_SUCCESS';

/** Action type dispatched when the fetch product sizes request fails. */
export const FETCH_PRODUCT_SIZES_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZES_FAILURE';
/** Action type dispatched when the fetch product sizes request starts. */
export const FETCH_PRODUCT_SIZES_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZES_REQUEST';
/** Action type dispatched when the fetch product sizes request succeeds. */
export const FETCH_PRODUCT_SIZES_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_SIZES_SUCCESS';

/** Action type dispatched when the reset details entities occurs. */
export const RESET_PRODUCT_DETAILS_ENTITIES =
  '@farfetch/blackout-redux/RESET_PRODUCT_DETAILS_ENTITIES';
/** Action type dispatched when the reset details state occurs. */
export const RESET_PRODUCT_DETAILS_STATE =
  '@farfetch/blackout-redux/RESET_PRODUCT_DETAILS_STATE';

/** Action type dispatched when the fetch product fittings request fails. */
export const FETCH_PRODUCT_FITTINGS_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_FITTINGS_FAILURE';
/** Action type dispatched when the fetch product fittings request starts. */
export const FETCH_PRODUCT_FITTINGS_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_FITTINGS_REQUEST';
/** Action type dispatched when the fetch product fittings request succeeds. */
export const FETCH_PRODUCT_FITTINGS_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_FITTINGS_SUCCESS';

// Products lists: listing and sets

/** Action type dispatched when the dehydrate products list occurs - used on
 * fetchListing and fetchSet actions. */
export const DEHYDRATE_PRODUCTS_LIST =
  '@farfetch/blackout-redux/DEHYDRATE_PRODUCTS_LIST';

/** Action type dispatched when the fetch products list request fails - used on
 * fetchListing and fetchSet actions. */
export const FETCH_PRODUCTS_LIST_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_FAILURE';
/** Action type dispatched when the fetch products list request starts - used on
 * fetchListing and fetchSet actions. */
export const FETCH_PRODUCTS_LIST_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_REQUEST';
/** Action type dispatched when the fetch products list request succeeds - used on
 * fetchListing and fetchSet actions. */
export const FETCH_PRODUCTS_LIST_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_SUCCESS';

/** Action type dispatched when the reset products list entities occurs - used on
 * `products.lists` reducer. */
export const RESET_PRODUCTS_LISTS_ENTITIES =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_ENTITIES';
/** Action type dispatched when the reset products list state occurs - used on
 * fetchListing, fetchSet, reset products lists state actions and `products.lists` reducer. */
export const RESET_PRODUCTS_LISTS_STATE =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_STATE';

/** Action type dispatched when the products list hash is setted - used on
 * fetchListing and fetchSet actions. */
export const SET_PRODUCTS_LIST_HASH =
  '@farfetch/blackout-redux/SET_PRODUCTS_LIST_HASH';

/** Action type dispatched when the fetch recommended set request fails. */
export const FETCH_RECOMMENDED_SET_FAILURE =
  '@farfetch/blackout-redux/FETCH_RECOMMENDED_SET_FAILURE';
/** Action type dispatched when the fetch recommended set request starts.  */
export const FETCH_RECOMMENDED_SET_REQUEST =
  '@farfetch/blackout-redux/FETCH_RECOMMENDED_SET_REQUEST';
/** Action type dispatched when the fetch recommended set request succeeds. */
export const FETCH_RECOMMENDED_SET_SUCCESS =
  '@farfetch/blackout-redux/FETCH_RECOMMENDED_SET_SUCCESS';
