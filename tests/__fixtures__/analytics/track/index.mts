import {
  type EventData,
  EventType,
  type TrackType,
} from '@farfetch/blackout-analytics';
import addressInfoAddedTrackData from './addressInfoAddedTrackData.fixtures.mjs';
import billingInfoAddedTrackData from './billingInfoAddedTrackData.fixtures.mjs';
import checkoutAbandonedTrackData from './checkoutAbandonedTrackData.fixtures.mjs';
import checkoutStartedTrackData from './checkoutStartedTrackData.fixtures.mjs';
import checkoutStepCompletedTrackData from './checkoutStepCompletedTrackData.fixtures.mjs';
import checkoutStepEditingTrackData from './checkoutStepEditingTrackData.fixtures.mjs';
import checkoutStepViewedTrackData from './checkoutStepViewedTrackData.fixtures.mjs';
import deliveryMethodAddedTrackData from './deliveryMethodAddedTrackData.fixtures.mjs';
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
import sitePerformanceTrackData from './sitePerformanceTrackData.fixtures.mjs';

export type TrackFixtures = {
  [eventType in EventType]: EventData<TrackType> & {
    event: EventType;
  };
};

const allFixtures: TrackFixtures = {
  [EventType.AddressInfoAdded]: addressInfoAddedTrackData,
  [EventType.DeliveryMethodAdded]: deliveryMethodAddedTrackData,
  [EventType.BillingInfoAdded]: billingInfoAddedTrackData,
  [EventType.CheckoutAbandoned]: checkoutAbandonedTrackData,
  [EventType.CheckoutStarted]: checkoutStartedTrackData,
  [EventType.CheckoutStepCompleted]: checkoutStepCompletedTrackData,
  [EventType.CheckoutStepEditing]: checkoutStepEditingTrackData,
  [EventType.CheckoutStepViewed]: checkoutStepViewedTrackData,
  [EventType.FiltersApplied]: filtersAppliedTrackData,
  [EventType.FiltersCleared]: filtersClearedTrackData,
  [EventType.InteractContent]: interactContentTrackData,
  [EventType.Login]: loginTrackData,
  [EventType.Logout]: logoutTrackData,
  [EventType.OrderCompleted]: orderCompletedTrackData,
  [EventType.OrderRefunded]: orderRefundedTrackData,
  [EventType.PaymentInfoAdded]: paymentInfoAddedTrackData,
  [EventType.PlaceOrderFailed]: placeOrderFailedTrackData,
  [EventType.PlaceOrderStarted]: placeOrderStartedTrackData,
  [EventType.ProductAddedToCart]: productAddedToCartTrackData,
  [EventType.ProductAddedToWishlist]: productAddedToWishlistTrackData,
  [EventType.ProductClicked]: productClickedTrackData,
  [EventType.ProductListViewed]: productListViewedTrackData,
  [EventType.ProductRemovedFromCart]: productRemovedFromCartTrackData,
  [EventType.ProductRemovedFromWishlist]: productRemovedFromWishlistTrackData,
  [EventType.ProductUpdated]: productUpdatedTrackData,
  [EventType.ProductUpdatedWishlist]: productUpdatedWishlistTrackData,
  [EventType.ProductViewed]: productViewedTrackData,
  [EventType.PromocodeApplied]: promocodeAppliedTrackData,
  [EventType.SelectContent]: selectContentTrackData,
  [EventType.Share]: shareTrackData,
  [EventType.ShippingInfoAdded]: shippingInfoAddedTrackData,
  [EventType.ShippingMethodAdded]: shippingMethodAddedTrackData,
  [EventType.SignupFormCompleted]: signupFormCompletedTrackData,
  [EventType.SignupFormViewed]: signupFormViewedTrackData,
  [EventType.SignupNewsletter]: signupNewsletterTrackData,
  [EventType.SitePerformance]: sitePerformanceTrackData,
};

export default allFixtures;
