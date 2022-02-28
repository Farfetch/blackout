/**
 * @module pageTypes
 * @category Analytics
 */

/**
 * Contains some page types that are supported by default
 * by the integrations included in this package.
 * To be used in analytics.page calls.
 */
const pageTypes = {
  ABOUT: 'about',
  ACCOUNT: 'account',
  ARTICLE: 'article',
  BAG: 'bag',
  BIOGRAPHY: 'biography',
  CHECKOUT: 'checkout',
  CHECKOUT_DELIVERY_METHOD: 'checkout-delivery-method',
  CHECKOUT_PAYMENT: 'checkout-payment',
  CHECKOUT_REVIEW: 'checkout-review',
  CHECKOUT_SHIPPING: 'checkout-shipping',
  COLLECTIONS: 'collections',
  COOKIE_PREFERENCES: 'cookie-preferences',
  CORPORATE: 'corporate',
  CUSTOMER_SERVICE: 'customer-service',
  DESIGNERS: 'designers',
  EDITORIAL: 'editorial',
  GENDER_SELECTION: 'gender-selection',
  GENERIC_ERROR: 'generic-error',
  HOMEPAGE: 'homepage',
  JOURNAL: 'journal',
  LOGIN: 'login',
  LOGIN_REGISTER: 'login-register',
  NEW_IN: 'new-in',
  NOT_FOUND: 'not-found',
  ORDER_CONFIRMATION: 'order-confirmation',
  PRODUCT_DETAILS: 'product-details',
  PRODUCT_LISTING: 'product-listing',
  RECOVER_PASSWORD: 'recover-password',
  REGISTER: 'register',
  RESET_PASSWORD: 'reset-password',
  RETURNS: 'returns',
  SALE: 'sale',
  SEARCH: 'search',
  SOCIAL: 'social',
  STORES: 'stores',
  UNSUBSCRIBE: 'unsubscribe',
  WISHLIST: 'wishlist',
};

/**
 * Validates if the pageType passed exists in `pageTypes`.
 *
 * @param types - PageTypes list.
 * @param type - Page type to validate.
 *
 * @returns The page type matched.
 */
export const isValidPageType = (
  types: Record<string, string>,
  type: string,
): boolean => Object.keys(types).some(value => type === types[value]);

export default pageTypes;
