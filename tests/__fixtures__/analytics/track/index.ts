import {
  EventData,
  eventTypes,
  TrackTypesValues,
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

type TrackFixtures = {
  [eventType in typeof eventTypes[keyof typeof eventTypes]]: EventData<TrackTypesValues> & {
    event: eventType;
  };
};

const allFixtures: TrackFixtures = {
  [eventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedTrackData,
  [eventTypes.CHECKOUT_ABANDONED]: checkoutAbandonedTrackData,
  [eventTypes.CHECKOUT_STARTED]: checkoutStartedTrackData,
  [eventTypes.CHECKOUT_STEP_COMPLETED]: checkoutStepCompletedTrackData,
  [eventTypes.CHECKOUT_STEP_EDITING]: checkoutStepEditingTrackData,
  [eventTypes.CHECKOUT_STEP_VIEWED]: checkoutStepViewedTrackData,
  [eventTypes.FILTERS_APPLIED]: filtersAppliedTrackData,
  [eventTypes.FILTERS_CLEARED]: filtersClearedTrackData,
  [eventTypes.INTERACT_CONTENT]: interactContentTrackData,
  [eventTypes.LOGIN]: loginTrackData,
  [eventTypes.LOGOUT]: logoutTrackData,
  [eventTypes.ORDER_COMPLETED]: orderCompletedTrackData,
  [eventTypes.ORDER_REFUNDED]: orderRefundedTrackData,
  [eventTypes.PAYMENT_INFO_ADDED]: paymentInfoAddedTrackData,
  [eventTypes.PLACE_ORDER_FAILED]: placeOrderFailedTrackData,
  [eventTypes.PLACE_ORDER_STARTED]: placeOrderStartedTrackData,
  [eventTypes.PRODUCT_ADDED_TO_CART]: productAddedToCartTrackData,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: productAddedToWishlistTrackData,
  [eventTypes.PRODUCT_CLICKED]: productClickedTrackData,
  [eventTypes.PRODUCT_LIST_VIEWED]: productListViewedTrackData,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: productRemovedFromCartTrackData,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]:
    productRemovedFromWishlistTrackData,
  [eventTypes.PRODUCT_UPDATED]: productUpdatedTrackData,
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: productUpdatedWishlistTrackData,
  [eventTypes.PRODUCT_VIEWED]: productViewedTrackData,
  [eventTypes.PROMOCODE_APPLIED]: promocodeAppliedTrackData,
  [eventTypes.SELECT_CONTENT]: selectContentTrackData,
  [eventTypes.SHARE]: shareTrackData,
  [eventTypes.SHIPPING_INFO_ADDED]: shippingInfoAddedTrackData,
  [eventTypes.SHIPPING_METHOD_ADDED]: shippingMethodAddedTrackData,
  [eventTypes.SIGNUP_FORM_COMPLETED]: signupFormCompletedTrackData,
  [eventTypes.SIGNUP_FORM_VIEWED]: signupFormViewedTrackData,
  [eventTypes.SIGNUP_NEWSLETTER]: signupNewsletterTrackData,
};

export default allFixtures;
