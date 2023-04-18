// Products lists: listing and sets

/**
 * Action type dispatched when the dehydrate product list occurs - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const DEHYDRATE_PRODUCTS_LIST =
  '@farfetch/blackout-redux/DEHYDRATE_PRODUCTS_LIST';

/**
 * Action type dispatched when the fetch product list request fails - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCTS_LIST_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_FAILURE';
/**
 * Action type dispatched when the fetch product list request starts - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCTS_LIST_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_REQUEST';
/**
 * Action type dispatched when the fetch product list request succeeds - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCTS_LIST_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCTS_LIST_SUCCESS';

/**
 * Action type dispatched when the reset product list entities occurs - used on
 * `products.lists` reducer.
 */
export const RESET_PRODUCTS_LISTS_ENTITIES =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_ENTITIES';
/**
 * Action type dispatched when the reset product list state occurs - used on
 * fetchProductListing, fetchProductSet, reset products lists state actions and `products.lists`
 * reducer.
 */
export const RESET_PRODUCTS_LISTS_STATE =
  '@farfetch/blackout-redux/RESET_PRODUCTS_LISTS_STATE';

/**
 * Action type dispatched when the product list hash is setted - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const SET_PRODUCTS_LIST_HASH =
  '@farfetch/blackout-redux/SET_PRODUCTS_LIST_HASH';
