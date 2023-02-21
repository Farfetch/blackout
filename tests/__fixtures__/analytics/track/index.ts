import {
  type EventData,
  EventTypes,
  type TrackTypes,
} from '@farfetch/blackout-analytics';
import addressInfoAddedTrackData from './addressInfoAddedTrackData.fixtures';
import checkoutAbandonedTrackData from './checkoutAbandonedTrackData.fixtures';
import checkoutStartedTrackData from './checkoutStartedTrackData.fixtures';
import checkoutStepCompletedTrackData from './checkoutStepCompletedTrackData.fixtures';
import checkoutStepEditingTrackData from './checkoutStepEditingTrackData.fixtures';
import checkoutStepViewedTrackData from './checkoutStepViewedTrackData.fixtures';
import filtersAppliedTrackData from './filtersAppliedTrackData.fixtures';
import filtersClearedTrackData from './filtersClearedTrackData.fixtures';
import interactContentTrackData from './interactContentTrackData.fixtures';
import loginTrackData from './loginTrackData.fixtures';
import logoutTrackData from './logoutTrackData.fixtures';
import orderCompletedTrackData from './orderCompletedTrackData.fixtures';
import orderRefundedTrackData from './orderRefundedTrackData.fixtures';
import paymentInfoAddedTrackData from './paymentInfoAddedTrackData.fixtures';
import placeOrderFailedTrackData from './placeOrderFailedTrackData.fixtures';
import placeOrderStartedTrackData from './placeOrderStartedTrackData.fixtures';
import productAddedToCartTrackData from './productAddedToCartTrackData.fixtures';
import productAddedToWishlistTrackData from './productAddedToWishlistTrackData.fixtures';
import productClickedTrackData from './productClickedTrackData.fixtures';
import productListViewedTrackData from './productListViewedTrackData.fixtures';
import productRemovedFromCartTrackData from './productRemovedFromCartTrackData.fixtures';
import productRemovedFromWishlistTrackData from './productRemovedFromWishlistTrackData.fixtures';
import productUpdatedTrackData from './productUpdatedTrackData.fixtures';
import productUpdatedWishlistTrackData from './productUpdatedWishlistTrackData.fixtures';
import productViewedTrackData from './productViewedTrackData.fixtures';
import promocodeAppliedTrackData from './promocodeAppliedTrackData.fixtures';
import selectContentTrackData from './selectContentTrackData.fixtures';
import shareTrackData from './shareTrackData.fixtures';
import shippingInfoAddedTrackData from './shippingInfoAddedTrackData.fixtures';
import shippingMethodAddedTrackData from './shippingMethodAddedTrackData.fixtures';
import signupFormCompletedTrackData from './signupFormCompletedTrackData.fixtures';
import signupFormViewedTrackData from './signupFormViewedTrackData.fixtures';
import signupNewsletterTrackData from './signupNewsletterTrackData.fixtures';

export type TrackFixtures = {
  [eventType in EventTypes]: EventData<TrackTypes> & {
    event: EventTypes;
  };
};

const allFixtures: TrackFixtures = {
  [EventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedTrackData,
  [EventTypes.CHECKOUT_ABANDONED]: checkoutAbandonedTrackData,
  [EventTypes.CHECKOUT_STARTED]: checkoutStartedTrackData,
  [EventTypes.CHECKOUT_STEP_COMPLETED]: checkoutStepCompletedTrackData,
  [EventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingTrackData,
  [EventTypes.CHECKOUT_STEP_VIEWED]: checkoutStepViewedTrackData,
  [EventTypes.FILTERS_APPLIED]: filtersAppliedTrackData,
  [EventTypes.FILTERS_CLEARED]: filtersClearedTrackData,
  [EventTypes.INTERACT_CONTENT]: interactContentTrackData,
  [EventTypes.LOGIN]: loginTrackData,
  [EventTypes.LOGOUT]: logoutTrackData,
  [EventTypes.ORDER_COMPLETED]: orderCompletedTrackData,
  [EventTypes.ORDER_REFUNDED]: orderRefundedTrackData,
  [EventTypes.PAYMENT_INFO_ADDED]: paymentInfoAddedTrackData,
  [EventTypes.PLACE_ORDER_FAILED]: placeOrderFailedTrackData,
  [EventTypes.PLACE_ORDER_STARTED]: placeOrderStartedTrackData,
  [EventTypes.PRODUCT_ADDED_TO_CART]: productAddedToCartTrackData,
  [EventTypes.PRODUCT_ADDED_TO_WISHLIST]: productAddedToWishlistTrackData,
  [EventTypes.PRODUCT_CLICKED]: productClickedTrackData,
  [EventTypes.PRODUCT_LIST_VIEWED]: productListViewedTrackData,
  [EventTypes.PRODUCT_REMOVED_FROM_CART]: productRemovedFromCartTrackData,
  [EventTypes.PRODUCT_REMOVED_FROM_WISHLIST]:
    productRemovedFromWishlistTrackData,
  [EventTypes.PRODUCT_UPDATED]: productUpdatedTrackData,
  [EventTypes.PRODUCT_UPDATED_WISHLIST]: productUpdatedWishlistTrackData,
  [EventTypes.PRODUCT_VIEWED]: productViewedTrackData,
  [EventTypes.PROMOCODE_APPLIED]: promocodeAppliedTrackData,
  [EventTypes.SELECT_CONTENT]: selectContentTrackData,
  [EventTypes.SHARE]: shareTrackData,
  [EventTypes.SHIPPING_INFO_ADDED]: shippingInfoAddedTrackData,
  [EventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedTrackData,
  [EventTypes.SIGNUP_FORM_COMPLETED]: signupFormCompletedTrackData,
  [EventTypes.SIGNUP_FORM_VIEWED]: signupFormViewedTrackData,
  [EventTypes.SIGNUP_NEWSLETTER]: signupNewsletterTrackData,
};

export default allFixtures;
