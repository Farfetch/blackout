export const INTERNAL_ZARAZ_EVENT = '__ap_zaraz_load__';
export const URL_HOST_REGEX = new RegExp('https?:\\/\\/([^\\/]*)', 'i');
export const ZARAZ_REQUEST_REGEX = new RegExp('zaraz', 'i');

export const OPTION_ENVIRONMENT = 'environment';
export const OPTION_EVENTS_MAPPER = 'eventsMapper';
export const OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT = 'initScriptEndpoint';
export const DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT = '/cdn-cgi/zaraz/i.js';

export const ZARAZ_ECOMMERCE_EVENTS = {
  PRODUCT_LIST_VIEWED: 'Product List Viewed',
  PRODUCTS_SEARCHED: 'Products Searched',
  PRODUCT_CLICKED: 'Product Clicked',
  PRODUCT_ADDED: 'Product Added',
  PRODUCT_ADDED_TO_WISHLIST: 'Product Added to Wishlist',
  PRODUCT_REMOVED: 'Product Removed',
  PRODUCT_VIEWED: 'Product Viewed',
  CART_VIEWED: 'Cart Viewed',
  CHECKOUT_STARTED: 'Checkout Started',
  CHECKOUT_STEP_VIEWED: 'Checkout Step Viewed',
  CHECKOUT_STEP_COMPLETED: 'Checkout Step Completed',
  PAYMENT_INFO_ENTERED: 'Payment Info Entered',
  ORDER_COMPLETED: 'Order Completed',
  ORDER_UPDATED: 'Order Updated',
  ORDER_REFUNDED: 'Order Refunded',
  ORDER_CANCELLED: 'Order Cancelled',
  CLICKED_PROMOTION: 'Clicked Promotion',
  VIEWED_PROMOTION: 'Viewed Promotion',
} as const;
