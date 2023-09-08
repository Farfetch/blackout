/**
 * @module eventTypes
 * @category Analytics
 */

/**
 * Contains events that are supported by default
 * by the integrations included in this package.
 * To be used in analytics.track calls.
 */
export default {
  /** Address Info Added should be tracked when an address info is added. */
  ADDRESS_INFO_ADDED: 'Address Info Added',
  /** Billing Info Added should be tracked when a billing info is added. */
  BILLING_INFO_ADDED: 'Billing Info Added',
  /** Checkout Abandoned should be tracked when the user abandons the checkout. */
  CHECKOUT_ABANDONED: 'Checkout Abandoned',
  /** Checkout Started should be tracked when a checkout is started. */
  CHECKOUT_STARTED: 'Checkout Started',
  /** Checkout Step Completed should be tracked whenever a step of a checkout is completed. */
  CHECKOUT_STEP_COMPLETED: 'Checkout Step Completed',
  /** Checkout Step Editing should be tracked when the user starts editing a checkout step. */
  CHECKOUT_STEP_EDITING: 'Checkout Step Editing',
  /** Checkout Step Viewed should be tracked when a new step of a checkout has begun. */
  CHECKOUT_STEP_VIEWED: 'Checkout Step Viewed',
  /** Click Share Wishlist should be tracked when the user tries to share a wishlist set. */
  CLICK_SHARE_WISHLIST: 'Click Share Wishlist',
  /** Create Custom Wishlist should be tracked when the user creates a wishlist set. */
  CREATE_CUSTOM_WISHLIST: 'Create Custom Wishlist',
  /** Delivery Method Added should be tracked when a delivery method is added. */
  DELIVERY_METHOD_ADDED: 'Delivery Method Added',
  /** Filters Applied should be tracked when the user actively changed filters. */
  FILTERS_APPLIED: 'Filters Applied',
  /** Filters Cleared should be tracked when the user actively clears all filters by interacting with a specific UI element for the effect. */
  FILTERS_CLEARED: 'Filters Cleared',
  /** Interact Content should be tracked whenever there is interest in tracking the user interaction with the interface. */
  INTERACT_CONTENT: 'Interact Content',
  /** Login should be tracked when the user logs in. */
  LOGIN: 'Login',
  /** Logout should be tracked when the user logs out. */
  LOGOUT: 'Logout',
  /** Order Completed should be tracked when a new transaction is made. */
  ORDER_COMPLETED: 'Order Completed',
  /** Order Refunded should be tracked when an order is refunded. */
  ORDER_REFUNDED: 'Order Refunded',
  /** Payment Info Added should be tracked when the user adds a new payment info. */
  PAYMENT_INFO_ADDED: 'Payment Info Added',
  /** Place Order Failed should be tracked after the submission of an order fails. */
  PLACE_ORDER_FAILED: 'Place Order Failed',
  /** Place Order Started should be tracked before the user submits an order. */
  PLACE_ORDER_STARTED: 'Place Order Started',
  /** Product Added to Cart should be tracked when a product is added to the user's cart. */
  PRODUCT_ADDED_TO_CART: 'Product Added to Cart',
  /** Product Added to Wishlist should be tracked when a product is added to the users' wishlist. */
  PRODUCT_ADDED_TO_WISHLIST: 'Product Added to Wishlist',
  /** Product Clicked should be tracked when the user clicks in a product to view its details. */
  PRODUCT_CLICKED: 'Product Clicked',
  /** Product List Viewed should be tracked when products are viewed in a list, i.e., products are visible in the viewport. */
  PRODUCT_LIST_VIEWED: 'Product List Viewed',
  /** Product Removed from Cart should be tracked when a product is removed from the user's cart. */
  PRODUCT_REMOVED_FROM_CART: 'Product Removed from Cart',
  /** Product Removed from Wishlist should be tracked when a product is removed from the users' wishlist. */
  PRODUCT_REMOVED_FROM_WISHLIST: 'Product Removed From Wishlist',
  /** Product Updated in Cart should be tracked when a product is updated in the user's cart. */
  PRODUCT_UPDATED: 'Product Updated',
  /** Product Updated in Wishlist should be tracked when a product is updated on the users' wishlist. */
  PRODUCT_UPDATED_WISHLIST: 'Product Updated In Wishlist',
  /** Product Viewed should be tracked when the user views a product detail page. */
  PRODUCT_VIEWED: 'Product Viewed',
  /** Promocode Applied should be tracked when the user applies a promocode to a checkout. */
  PROMOCODE_APPLIED: 'Promocode Applied',
  /** Select Content should be tracked when the user selects a content, i.e., a product item. */
  REMOVE_CUSTOM_WISHLIST: 'Remove Custom Wishlist',
  /** View Shared Wishlist should be tracked when the user views a shared wishlist page. */
  SELECT_CONTENT: 'Select Content',
  /** Share should be tracked when the share feature is clicked. */
  SHARE: 'Share',
  /** Share Wishlist Link should be tracked when the user copies the sharing link. */
  SHARE_WISHLIST_LINK: 'Share Wishlist Link',
  /** Share Wishlist Options should be tracked when the user clicks on any option available for sharing the link of a shared wishlist. */
  SHARE_WISHLIST_OPTIONS: 'Share Wishlist Options',
  /** Shipping Info Added should be tracked when the user adds the shipping info. */
  SHIPPING_INFO_ADDED: 'Shipping Info Added',
  /** Shipping Method Added should be tracked when a shipping method is added. */
  SHIPPING_METHOD_ADDED: 'Shipping Method Added',
  /** Signup From Completed should be tracked when the user completes the sign-up form. */
  SIGNUP_FORM_COMPLETED: 'Sign-up Form Completed',
  /** Signup From Viewed should be tracked when the signup form is viewed. */
  SIGNUP_FORM_VIEWED: 'Sign-up Form Viewed',
  /** Signup Newsletter should be tracked when the user signs-up the newsletter. */
  SIGNUP_NEWSLETTER: 'Sign-up Newsletter',
  /** Stop Sharing Wishlist should be tracked when the user confirms to stop sharing a wishlist set. */
  STOP_SHARING_WISHLIST: 'Stop Sharing Wishlist',
  /** Remove Custom Wishlist should be tracked when the user deletes a wishlist set. */
  VIEW_SHARED_WISHLIST: 'View Shared Wishlist',
};
