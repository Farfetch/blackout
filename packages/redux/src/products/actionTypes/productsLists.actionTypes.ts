// Products lists: listing and sets

/**
 * Action type dispatched when the dehydrate products list occurs - used on
 * fetchListing and fetchSet actions.
 */
export const DEHYDRATE_PRODUCTS_LIST =
  '@farfetch/blackout-redux/DEHYDRATE_PRODUCTS_LIST';

/**
 * Action type dispatched when the fetch products list request fails - used on
 * fetchListing and fetchSet actions.
 */
export const FETCH_PRODUCTS_LIST_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_FAILURE';
/**
 * Action type dispatched when the fetch products list request starts - used on
 * fetchListing and fetchSet actions.
 */
export const FETCH_PRODUCTS_LIST_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_REQUEST';
/**
 * Action type dispatched when the fetch products list request succeeds - used on
 * fetchListing and fetchSet actions.
 */
export const FETCH_PRODUCTS_LIST_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_SUCCESS';

/**
 * Action type dispatched when the reset products list entities occurs - used on
 * `products.lists` reducer.
 */
export const RESET_PRODUCTS_LISTS_ENTITIES =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_ENTITIES';
/**
 * Action type dispatched when the reset products list state occurs - used on
 * fetchListing, fetchSet, reset products lists state actions and `products.lists`
 * reducer.
 */
export const RESET_PRODUCTS_LISTS_STATE =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_STATE';

/**
 * Action type dispatched when the products list hash is setted - used on
 * fetchListing and fetchSet actions.
 */
export const SET_PRODUCTS_LIST_HASH =
  '@farfetch/blackout-redux/SET_PRODUCTS_LIST_HASH';
