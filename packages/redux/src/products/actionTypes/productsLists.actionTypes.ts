// Products lists: listing and sets

/**
 * Action type dispatched when the dehydrate product listing occurs - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const DEHYDRATE_PRODUCT_LISTING =
  '@farfetch/blackout-redux/DEHYDRATE_PRODUCT_LISTING';

/**
 * Action type dispatched when the fetch product listing request fails - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCT_LISTING_FAILURE =
  '@farfetch/blackout-redux/FETCH_PRODUCT_LISTING_FAILURE';
/**
 * Action type dispatched when the fetch product listing request starts - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCT_LISTING_REQUEST =
  '@farfetch/blackout-redux/FETCH_PRODUCT_LISTING_REQUEST';
/**
 * Action type dispatched when the fetch product listing request succeeds - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const FETCH_PRODUCT_LISTING_SUCCESS =
  '@farfetch/blackout-redux/FETCH_PRODUCT_LISTING_SUCCESS';

/**
 * Action type dispatched when the reset product listings entities occurs - used on
 * `products.lists` reducer.
 */
export const RESET_PRODUCT_LISTING_ENTITIES =
  '@farfetch/blackout-redux/RESET_PRODUCT_LISTING_ENTITIES';
/**
 * Action type dispatched when the reset product listings state occurs - used on
 * fetchProductListing, fetchProductSet, reset products lists state actions and `products.lists`
 * reducer.
 */
export const RESET_PRODUCT_LISTINGS_STATE =
  '@farfetch/blackout-redux/RESET_PRODUCT_LISTINGS_STATE';

/**
 * Action type dispatched when the product listing hash is setted - used on
 * fetchProductListing and fetchProductSet actions.
 */
export const SET_PRODUCT_LISTING_HASH =
  '@farfetch/blackout-redux/SET_PRODUCT_LISTING_HASH';
