import {
  type EventData,
  EventTypes,
  type TrackTypes,
} from '@farfetch/blackout-analytics';
import addressInfoAddedTrackData from './addressInfoAddedTrackData.fixtures.mjs';
import checkoutAbandonedTrackData from './checkoutAbandonedTrackData.fixtures.mjs';
import checkoutStartedTrackData from './checkoutStartedTrackData.fixtures.mjs';
import checkoutStepCompletedTrackData from './checkoutStepCompletedTrackData.fixtures.mjs';
import checkoutStepEditingTrackData from './checkoutStepEditingTrackData.fixtures.mjs';
import checkoutStepViewedTrackData from './checkoutStepViewedTrackData.fixtures.mjs';
import filtersAppliedTrackData from './filtersAppliedTrackData.fixtures.mjs';
import filtersClearedTrackData from './filtersClearedTrackData.fixtures.mjs';
import interactContentTrackData from './interactContentTrackData.fixtures.mjs';
import loginTrackData from './loginTrackData.fixtures.mjs';
import logoutTrackData from './logoutTrackData.fixtures.mjs';
import orderCompletedTrackData from './orderCompletedTrackData.fixtures.mjs';
import orderRefundedTrackData from './orderRefundedTrackData.fixtures.mjs';
import paymentInfoAddedTrackData from './paymentInfoAddedTrackData.fixtures.mjs';
import placeOrderFailedTrackData from './placeOrderFailedTrackData.fixtures.mjs';
import placeOrderStartedTrackData from './placeOrderStartedTrackData.fixtures.mjs';
import productAddedToCartTrackData from './productAddedToCartTrackData.fixtures.mjs';
import productAddedToWishlistTrackData from './productAddedToWishlistTrackData.fixtures.mjs';
import productClickedTrackData from './productClickedTrackData.fixtures.mjs';
import productListViewedTrackData from './productListViewedTrackData.fixtures.mjs';
import productRemovedFromCartTrackData from './productRemovedFromCartTrackData.fixtures.mjs';
import productRemovedFromWishlistTrackData from './productRemovedFromWishlistTrackData.fixtures.mjs';
import productUpdatedTrackData from './productUpdatedTrackData.fixtures.mjs';
import productUpdatedWishlistTrackData from './productUpdatedWishlistTrackData.fixtures.mjs';
import productViewedTrackData from './productViewedTrackData.fixtures.mjs';
import promocodeAppliedTrackData from './promocodeAppliedTrackData.fixtures.mjs';
import selectContentTrackData from './selectContentTrackData.fixtures.mjs';
import shareTrackData from './shareTrackData.fixtures.mjs';
import shippingInfoAddedTrackData from './shippingInfoAddedTrackData.fixtures.mjs';
import shippingMethodAddedTrackData from './shippingMethodAddedTrackData.fixtures.mjs';
import signupFormCompletedTrackData from './signupFormCompletedTrackData.fixtures.mjs';
import signupFormViewedTrackData from './signupFormViewedTrackData.fixtures.mjs';
import signupNewsletterTrackData from './signupNewsletterTrackData.fixtures.mjs';
import deliveryMethodAddedTrackData from './deliveryMethodAddedTrackData.fixtures.mjs';
import billingInfoAddedTrackData from './billingInfoAddedTrackData.fixtures.mjs';

export type TrackFixtures = {
  [eventType in EventTypes]: EventData<TrackTypes> & {
    event: EventTypes;
  };
};

const allFixtures: TrackFixtures = {
  [EventTypes.ADDRESS_INFO_ADDED]: addressInfoAddedTrackData,
  [EventTypes.DELIVERY_METHOD_ADDED]: deliveryMethodAddedTrackData,
  [EventTypes.BILLING_INFO_ADDED]: billingInfoAddedTrackData,
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
