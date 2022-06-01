/*
 * Constants to help understanding the typeRequest and the typeFilter properties
 * from the fetchSearchIntents action result.
 */

/*
 * The typeRequest property is a numeric that classifies the search intents
 * results in a type, which allow consumers to react differently:
 * - listing (typeRequest=0)
 * - product (typeRequest=1)
 * - redirect (typeRequest=2)
 */
export const TYPE_REQUEST = {
  LISTING: 0,
  PRODUCT: 1,
  REDIRECT: 2,
};

/*
 * The typeFilter property is a list of entity values of the resources that was a
 * match to the request terms from query object. These values help the consumers
 * to complete the final URL, with some additional information, like which
 * categories should be included on the listing page, what is the product id
 * from the PDP to be rendered, etc.
 *
 * The typeFilter can assume the following options:
 * - product ID (typeFilter=0)
 * - brands (typeFilter=1)
 * - categories (typeFilter=2)
 * - gender (typeFilter=3)
 * - materials (typeFilter=4)
 * - attributes (typeFilter=5)
 * - sizes (typeFilter=6)
 * - price (typeFilter=7)
 * - colors (typeFilter=8)
 * - price type (typeFilter=9)
 * - text (typeFilter=10)
 * .*/
export const TYPE_FILTER = {
  PRODUCTID: 0,
  BRANDS: 1,
  CATEGORIES: 2,
  GENDER: 3,
  MATERIALS: 4,
  ATTRIBUTES: 5,
  SIZES: 6,
  PRICE: 7,
  COLORS: 8,
  PRICETYPE: 9,
  TEXT: 10,
} as const;

/*
 * This is not related to the endpoint response, but it's our recommendation
 * about the order to construct the slugs to redirect the user to a more
 * specific page.
 * The recommendation is create the slug firstly with the gender, followed by
 * the brands and with categories in the end.
 */
export const FILTER_SLUGS_ORDER = [
  TYPE_FILTER.GENDER,
  TYPE_FILTER.BRANDS,
  TYPE_FILTER.CATEGORIES,
];
