/**
 * Contains events that are supported by default by the integrations included in
 * this package. To be used in analytics.track calls.
 */
enum EventType {
  /**
   * Address Info Added should be tracked when an address info is added.
   */
  AddressInfoAdded = 'Address Info Added',
  /**
   * Billing Info Added should be tracked when an billing info is added.
   */
  BillingInfoAdded = 'Billing Info Added',
  /**
   * Checkout Abandoned should be tracked when the user abandons the checkout.
   */
  CheckoutAbandoned = 'Checkout Abandoned',
  /**
   * Checkout Started should be tracked when a checkout is started.
   */
  CheckoutStarted = 'Checkout Started',
  /**
   * Checkout Step Completed should be tracked whenever a step of a checkout is
   * completed.
   */
  CheckoutStepCompleted = 'Checkout Step Completed',
  /**
   * Checkout Step Editing should be tracked when the user starts editing a checkout
   * step.
   */
  CheckoutStepEditing = 'Checkout Step Editing',
  /**
   * Checkout Step Viewed should be tracked when a new step of a checkout has begun.
   */
  CheckoutStepViewed = 'Checkout Step Viewed',
  /**
   * Delivery Method Added should be tracked when a delivery method is added.
   */
  DeliveryMethodAdded = 'Delivery Method Added',
  /**
   * Filters Applied should be tracked when the user actively changed filters.
   */
  FiltersApplied = 'Filters Applied',
  /**
   * Filters Cleared should be tracked when the user actively clears all filters by
   * interacting with a specific UI element for the effect.
   */
  FiltersCleared = 'Filters Cleared',
  /**
   * Interact Content should be tracked whenever there is interest in tracking the
   * user interaction with the interface.
   */
  InteractContent = 'Interact Content',
  /**
   * Login should be tracked when the user logs in.
   */
  Login = 'Login',
  /**
   * Logout should be tracked when the user logs out.
   */
  Logout = 'Logout',
  /**
   * Order Completed should be tracked when a new transaction is made.
   */
  OrderCompleted = 'Order Completed',
  /**
   * Order Refunded should be tracked when an order is refunded.
   */
  OrderRefunded = 'Order Refunded',
  /**
   * Payment Info Added should be tracked when the user adds a new payment info.
   */
  PaymentInfoAdded = 'Payment Info Added',
  /**
   * Place Order Failed should be tracked after the submission of an order fails.
   */
  PlaceOrderFailed = 'Place Order Failed',
  /**
   * Place Order Started should be tracked before the user submits an order.
   */
  PlaceOrderStarted = 'Place Order Started',
  /**
   * Product Added to Cart should be tracked when a product is added to the user's
   * cart.
   */
  ProductAddedToCart = 'Product Added to Cart',
  /**
   * Product Added to Wishlist should be tracked when a product is added to the
   * users' wishlist.
   */
  ProductAddedToWishlist = 'Product Added to Wishlist',
  /**
   * Product Clicked should be tracked when the user clicks in a product to view its
   * details.
   */
  ProductClicked = 'Product Clicked',
  /**
   * Product List Viewed should be tracked when products are viewed in a list, i.e.,
   * products are visible in the viewport.
   */
  ProductListViewed = 'Product List Viewed',
  /**
   * Product Removed from Cart should be tracked when a product is removed from the
   * user's cart.
   */
  ProductRemovedFromCart = 'Product Removed from Cart',
  /**
   * Product Removed from Wishlist should be tracked when a product is removed from
   * the users' wishlist.
   */
  ProductRemovedFromWishlist = 'Product Removed From Wishlist',
  /**
   * Product Updated in Cart should be tracked when a product is updated in the
   * user's cart.
   */
  ProductUpdated = 'Product Updated',
  /**
   * Product Updated in Wishlist should be tracked when a product is updated on the
   * users' wishlist.
   */
  ProductUpdatedWishlist = 'Product Updated In Wishlist',
  /**
   * Product Viewed should be tracked when the user views a product detail page.
   */
  ProductViewed = 'Product Viewed',
  /**
   * Promocode Applied should be tracked when the user applies a promocode to a
   * checkout.
   */
  PromocodeApplied = 'Promocode Applied',
  /**
   * Select Content should be tracked when the user selects a content, i.e., a
   * product item.
   */
  SelectContent = 'Select Content',
  /**
   * Share should be tracked when the share feature is clicked.
   */
  Share = 'Share',
  /**
   * Shipping Info Added should be tracked when the user adds the shipping info.
   */
  ShippingInfoAdded = 'Shipping Info Added',
  /**
   * Shipping Method Added should be tracked when a shipping method is added.
   */
  ShippingMethodAdded = 'Shipping Method Added',
  /**
   * Signup Form Completed should be tracked when the user completes the sign-up
   * form.
   */
  SignupFormCompleted = 'Sign-up Form Completed',
  /**
   * Signup Form Viewed should be tracked when the signup form is viewed.
   */
  SignupFormViewed = 'Sign-up Form Viewed',
  /**
   * Signup Newsletter should be tracked when the user signs-up the newsletter.
   */
  SignupNewsletter = 'Sign-up Newsletter',
}

export default EventType;
