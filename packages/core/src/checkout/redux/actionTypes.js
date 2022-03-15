/**
 * @module checkout/actionTypes
 * @category Checkout
 * @subcategory Actions
 */

/** Action type dispatched when the create checkout request fails. */
export const CREATE_CHECKOUT_FAILURE =
  '@farfetch/blackout-core/CREATE_CHECKOUT_FAILURE';
/** Action type dispatched when the create checkout request starts. */
export const CREATE_CHECKOUT_REQUEST =
  '@farfetch/blackout-core/CREATE_CHECKOUT_REQUEST';
/** Action type dispatched when the create checkout request succeeds. */
export const CREATE_CHECKOUT_SUCCESS =
  '@farfetch/blackout-core/CREATE_CHECKOUT_SUCCESS';

/** Action type dispatched when the get charges request fails. */
export const GET_CHARGES_FAILURE =
  '@farfetch/blackout-core/GET_CHARGES_FAILURE';
/** Action type dispatched when the get charges request starts. */
export const GET_CHARGES_REQUEST =
  '@farfetch/blackout-core/GET_CHARGES_REQUEST';
/** Action type dispatched when the get charges request succeeds. */
export const GET_CHARGES_SUCCESS =
  '@farfetch/blackout-core/GET_CHARGES_SUCCESS';

/** Action type dispatched when the post charges request fails. */
export const POST_CHARGES_FAILURE =
  '@farfetch/blackout-core/POST_CHARGES_FAILURE';
/** Action type dispatched when the post charges request starts. */
export const POST_CHARGES_REQUEST =
  '@farfetch/blackout-core/POST_CHARGES_REQUEST';
/** Action type dispatched when the post charges request succeeds. */
export const POST_CHARGES_SUCCESS =
  '@farfetch/blackout-core/POST_CHARGES_SUCCESS';
/** Action type dispatched when reseting the charges. */
export const RESET_CHARGES = '@farfetch/blackout-core/RESET_CHARGES';

/** Action type dispatched when the complete payment checkout request fails. */
export const COMPLETE_PAYMENT_CHECKOUT_FAILURE =
  '@farfetch/blackout-core/COMPLETE_PAYMENT_CHECKOUT_FAILURE';
/** Action type dispatched when the complete payment checkout request starts. */
export const COMPLETE_PAYMENT_CHECKOUT_REQUEST =
  '@farfetch/blackout-core/COMPLETE_PAYMENT_CHECKOUT_REQUEST';
/** Action type dispatched when the complete payment checkout request succeeds. */
export const COMPLETE_PAYMENT_CHECKOUT_SUCCESS =
  '@farfetch/blackout-core/COMPLETE_PAYMENT_CHECKOUT_SUCCESS';

/** Action type dispatched when the get checkout request fails. */
export const GET_CHECKOUT_FAILURE =
  '@farfetch/blackout-core/GET_CHECKOUT_FAILURE';
/** Action type dispatched when the get checkout request starts. */
export const GET_CHECKOUT_REQUEST =
  '@farfetch/blackout-core/GET_CHECKOUT_REQUEST';
/** Action type dispatched when the get checkout request succeeds. */
export const GET_CHECKOUT_SUCCESS =
  '@farfetch/blackout-core/GET_CHECKOUT_SUCCESS';

/** Action type dispatched when the get operations request fails. */
export const GET_OPERATIONS_FAILURE =
  '@farfetch/blackout-core/GET_OPERATIONS_FAILURE';
/** Action type dispatched when the get operations request starts. */
export const GET_OPERATIONS_REQUEST =
  '@farfetch/blackout-core/GET_OPERATIONS_REQUEST';
/** Action type dispatched when the get operations request succeeds. */
export const GET_OPERATIONS_SUCCESS =
  '@farfetch/blackout-core/GET_OPERATIONS_SUCCESS';

/** Action type dispatched when the get operation request fails. */
export const GET_OPERATION_FAILURE =
  '@farfetch/blackout-core/GET_OPERATION_FAILURE';
/** Action type dispatched when the get operation request starts. */
export const GET_OPERATION_REQUEST =
  '@farfetch/blackout-core/GET_OPERATION_REQUEST';
/** Action type dispatched when the get operation request succeeds. */
export const GET_OPERATION_SUCCESS =
  '@farfetch/blackout-core/GET_OPERATION_SUCCESS';

/** Action type dispatched when the update order item request fails. */
export const UPDATE_ORDER_ITEM_FAILURE =
  '@farfetch/blackout-core/UPDATE_ORDER_ITEM_FAILURE';
/** Action type dispatched when the update order item request starts. */
export const UPDATE_ORDER_ITEM_REQUEST =
  '@farfetch/blackout-core/UPDATE_ORDER_ITEM_REQUEST';
/** Action type dispatched when the update order item request succeeds. */
export const UPDATE_ORDER_ITEM_SUCCESS =
  '@farfetch/blackout-core/UPDATE_ORDER_ITEM_SUCCESS';

/** Action type dispatched when the delete order item request fails. */
export const DELETE_ORDER_ITEM_FAILURE =
  '@farfetch/blackout-core/DELETE_ORDER_ITEM_FAILURE';
/** Action type dispatched when the delete order item request starts. */
export const DELETE_ORDER_ITEM_REQUEST =
  '@farfetch/blackout-core/DELETE_ORDER_ITEM_REQUEST';
/** Action type dispatched when the delete order item request succeeds. */
export const DELETE_ORDER_ITEM_SUCCESS =
  '@farfetch/blackout-core/DELETE_ORDER_ITEM_SUCCESS';

/** Action type dispatched when reseting the checkout. */
export const RESET_CHECKOUT = '@farfetch/blackout-core/RESET_CHECKOUT';

/** Action type dispatched when the get checkout details request fails. */
export const GET_CHECKOUT_DETAILS_FAILURE =
  '@farfetch/blackout-core/GET_CHECKOUT_DETAILS_FAILURE';
/** Action type dispatched when the get checkout details request starts. */
export const GET_CHECKOUT_DETAILS_REQUEST =
  '@farfetch/blackout-core/GET_CHECKOUT_DETAILS_REQUEST';
/** Action type dispatched when the get checkout details request succeeds. */
export const GET_CHECKOUT_DETAILS_SUCCESS =
  '@farfetch/blackout-core/GET_CHECKOUT_DETAILS_SUCCESS';

/** Action type dispatched when the get collectpoints request fails. */
export const GET_COLLECTPOINTS_FAILURE =
  '@farfetch/blackout-core/GET_COLLECTPOINTS_FAILURE';
/** Action type dispatched when the get collectpoints request starts. */
export const GET_COLLECTPOINTS_REQUEST =
  '@farfetch/blackout-core/GET_COLLECTPOINTS_REQUEST';
/** Action type dispatched when the get collectpoints request succeeds. */
export const GET_COLLECTPOINTS_SUCCESS =
  '@farfetch/blackout-core/GET_COLLECTPOINTS_SUCCESS';

/** Action type dispatched when the get item delivery provisioning
 *  request fails. */
export const GET_ITEM_DELIVERY_PROVISIONING_FAILURE =
  '@farfetch/blackout-core/GET_ITEM_DELIVERY_PROVISIONING_FAILURE';
/** Action type dispatched when the get item delivery provisioning
 *  request starts. */
export const GET_ITEM_DELIVERY_PROVISIONING_REQUEST =
  '@farfetch/blackout-core/GET_ITEM_DELIVERY_PROVISIONING_REQUEST';
/** Action type dispatched when the get item delivery provisioning
 *  request succeeds. */
export const GET_ITEM_DELIVERY_PROVISIONING_SUCCESS =
  '@farfetch/blackout-core/GET_ITEM_DELIVERY_PROVISIONING_SUCCESS';

/** Action type dispatched when the get delivery bundle upgrades request fails. */
export const GET_DELIVERY_BUNDLE_UPGRADES_FAILURE =
  '@farfetch/blackout-core/GET_DELIVERY_BUNDLE_UPGRADES_FAILURE';
/** Action type dispatched when the get delivery bundle upgrades
 * request starts. */
export const GET_DELIVERY_BUNDLE_UPGRADES_REQUEST =
  '@farfetch/blackout-core/GET_DELIVERY_BUNDLE_UPGRADES_REQUEST';
/** Action type dispatched when the get delivery bundle upgrades
 * request succeeds. */
export const GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS =
  '@farfetch/blackout-core/GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS';

/** Action type dispatched when the get item delivery provisioning
 * request fails. */
export const GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE =
  '@farfetch/blackout-core/GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE';
/** Action type dispatched when the get item delivery provisionin
 * request starts. */
export const GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST =
  '@farfetch/blackout-core/GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST';
/** Action type dispatched when the get item delivery provisioni
 * request succeeds. */
export const GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS =
  '@farfetch/blackout-core/GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS';

/** Action type dispatched when the set item tags request fails. */
export const SET_ITEM_TAGS_FAILURE =
  '@farfetch/blackout-core/SET_ITEM_TAGS_FAILURE';
/** Action type dispatched when the set item tags request starts. */
export const SET_ITEM_TAGS_REQUEST =
  '@farfetch/blackout-core/SET_ITEM_TAGS_REQUEST';
/** Action type dispatched when the set item tags request succeeds. */
export const SET_ITEM_TAGS_SUCCESS =
  '@farfetch/blackout-core/SET_ITEM_TAGS_SUCCESS';

/** Action type dispatched when the set promocode request fails. */
export const SET_PROMOCODE_FAILURE =
  '@farfetch/blackout-core/SET_PROMOCODE_FAILURE';
/** Action type dispatched when the set promocode request starts. */
export const SET_PROMOCODE_REQUEST =
  '@farfetch/blackout-core/SET_PROMOCODE_REQUEST';
/** Action type dispatched when the set promocode request succeeds. */
export const SET_PROMOCODE_SUCCESS =
  '@farfetch/blackout-core/SET_PROMOCODE_SUCCESS';

/** Action type dispatched when the set tags request fails. */
export const SET_TAGS_FAILURE = '@farfetch/blackout-core/SET_TAGS_FAILURE';
/** Action type dispatched when the set tags request starts. */
export const SET_TAGS_REQUEST = '@farfetch/blackout-core/SET_TAGS_REQUEST';
/** Action type dispatched when the set tags request succeeds. */
export const SET_TAGS_SUCCESS = '@farfetch/blackout-core/SET_TAGS_SUCCESS';

/** Action type dispatched when the update checkout request fails. */
export const UPDATE_CHECKOUT_FAILURE =
  '@farfetch/blackout-core/UPDATE_CHECKOUT_FAILURE';
/** Action type dispatched when the update checkout request starts. */
export const UPDATE_CHECKOUT_REQUEST =
  '@farfetch/blackout-core/UPDATE_CHECKOUT_REQUEST';
/** Action type dispatched when the update checkout request succeeds. */
export const UPDATE_CHECKOUT_SUCCESS =
  '@farfetch/blackout-core/UPDATE_CHECKOUT_SUCCESS';

/** Action type dispatched when the update delivery bundle upgrade
 * request fails. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE';
/** Action type dispatched when the update delivery bundle upgrade
 * request starts. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST';
/** Action type dispatched when the update delivery bundle upgrade
 * request succeeds. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS';

/** Action type dispatched when the update delivery bundle upgrades
 * request fails. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE';
/** Action type dispatched when the update delivery bundle upgrades
 * request starts. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST';
/** Action type dispatched when the update delivery bundle upgrades
 * request succeeds. */
export const UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS =
  '@farfetch/blackout-core/UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS';

/** Action type dispatched when the update gift message request fails. */
export const UPDATE_GIFT_MESSAGE_FAILURE =
  '@farfetch/blackout-core/UPDATE_GIFT_MESSAGE_FAILURE';
/** Action type dispatched when the update gift message request starts. */
export const UPDATE_GIFT_MESSAGE_REQUEST =
  '@farfetch/blackout-core/UPDATE_GIFT_MESSAGE_REQUEST';
/** Action type dispatched when the update gift message request succeeds. */
export const UPDATE_GIFT_MESSAGE_SUCCESS =
  '@farfetch/blackout-core/UPDATE_GIFT_MESSAGE_SUCCESS';
