import { eventTypes } from '@farfetch/blackout-analytics';
import checkoutStartedTrackData from './checkoutStartedTrackData.fixtures';
import checkoutStepCompletedTrackData from './checkoutStepCompletedTrackData.fixtures';
import checkoutStepViewedTrackData from './checkoutStepViewedTrackData.fixtures';
import loginTrackData from './loginTrackData.fixtures';
import orderCompletedTrackData from './orderCompletedTrackData.fixtures';
import orderRefundedTrackData from './orderRefundedTrackData.fixtures';
import paymentInfoAddedTrackData from './paymentInfoAddedTrackData.fixtures';
import productAddedToCartTrackData from './productAddedToCartTrackData.fixtures';
import productAddedToWishlistTrackData from './productAddedToWishlistTrackData.fixtures';
import productClickedTrackData from './productClickedTrackData.fixtures';
import productListViewedTrackData from './productListViewedTrackData.fixtures';
import productRemovedFromCartTrackData from './productRemovedFromCartTrackData.fixtures';
import productRemovedFromWishlistTrackData from './productRemovedFromWishlistTrackData.fixtures';
import productUpdatedWishlistTrackData from './productUpdatedWishlistTrackData.fixtures';
import productViewedTrackData from './productViewedTrackData.fixtures';
import selectContentTrackData from './selectContentTrackData.fixtures';
import shippingInfoAddedTrackData from './shippingInfoAddedTrackData.fixtures';
import signupFormCompletedTrackData from './signupFormCompletedTrackData.fixtures';

export default {
  [eventTypes.CHECKOUT_STARTED]: checkoutStartedTrackData,
  [eventTypes.CHECKOUT_STEP_COMPLETED]: checkoutStepCompletedTrackData,
  [eventTypes.CHECKOUT_STEP_VIEWED]: checkoutStepViewedTrackData,
  [eventTypes.ORDER_COMPLETED]: orderCompletedTrackData,
  [eventTypes.ORDER_REFUNDED]: orderRefundedTrackData,
  [eventTypes.PRODUCT_ADDED_TO_CART]: productAddedToCartTrackData,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: productAddedToWishlistTrackData,
  [eventTypes.PRODUCT_CLICKED]: productClickedTrackData,
  [eventTypes.PRODUCT_LIST_VIEWED]: productListViewedTrackData,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: productRemovedFromCartTrackData,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]:
    productRemovedFromWishlistTrackData,
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: productUpdatedWishlistTrackData,
  [eventTypes.PRODUCT_VIEWED]: productViewedTrackData,
  [eventTypes.LOGIN]: loginTrackData,
  [eventTypes.SIGNUP_FORM_COMPLETED]: signupFormCompletedTrackData,
  [eventTypes.ADD_PAYMENT_INFO]: paymentInfoAddedTrackData,
  [eventTypes.SHIPPING_INFO_ADDED]: shippingInfoAddedTrackData,
  [eventTypes.SELECT_CONTENT]: selectContentTrackData,
  [eventTypes.PAYMENT_INFO_ADDED]: paymentInfoAddedTrackData,
};
