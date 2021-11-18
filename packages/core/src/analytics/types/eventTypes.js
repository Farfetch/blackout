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
  /** Checkout Started should be tracked when a checkout is started. */
  CHECKOUT_STARTED: 'Checkout Started',
  /** Checkout Step Completed should be tracked whenever a step of a checkout is completed. */
  CHECKOUT_STEP_COMPLETED: 'Checkout Step Completed',
  /** Checkout Step Viewed should be tracked when a new step of a checkout has begun. */
  CHECKOUT_STEP_VIEWED: 'Checkout Step Viewed',
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
  /** Product Added to Wishlist should be tracked when a product is added to the users's wishlist. */
  PRODUCT_ADDED_TO_WISHLIST: 'Product Added to Wishlist',
  /** Product Clicked should be tracked when the user clicks in a product to view its details. */
  PRODUCT_CLICKED: 'Product Clicked',
  /** Product List Viewed should be tracked when products are viewed in a list, i.e., products are visible in the viewport. */
  PRODUCT_LIST_VIEWED: 'Product List Viewed',
  /** Product Removed from Cart should be tracked when a product is removed from the user's cart. */
  PRODUCT_REMOVED_FROM_CART: 'Product Removed from Cart',
  /** Product Removed from Wishlist should be tracked when a product is removed from the users's wishlist. */
  PRODUCT_REMOVED_FROM_WISHLIST: 'Product Removed From Wishlist',
  /** Product Updated in Wishlist should be tracked when a product is updated on the users's wishlist. */
  PRODUCT_UPDATED_WISHLIST: 'Product Updated In Wishlist',
  /** Product Viewed should be tracked when the user views a product detail page. */
  PRODUCT_VIEWED: 'Product Viewed',
  /** Select Content should be tracked when the user selects a content, i.e., a product item. */
  SELECT_CONTENT: 'Select Content',
  /** Shipping Info Added should be tracked when the user adds the shipping info. */
  SHIPPING_INFO_ADDED: 'Shipping Info Added',
  /** Signup From Completed should be tracked when the user completes the sign-up form. */
  SIGNUP_FORM_COMPLETED: 'Sign-up Form Completed',
  /** Signup From Viewed should be tracked the signup form is viewed. */
  SIGNUP_FORM_VIEWED: 'Sign-up Form Viewed',
};
