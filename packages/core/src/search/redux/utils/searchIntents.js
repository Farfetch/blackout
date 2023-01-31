/** Constants to help understandig the result from the doGetSearchIntents action.*/
export const TYPE_REQUEST = {
  LISTING: 0,
  PRODUCT: 1,
  REDIRECT: 2,
};

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
};

export const FILTER_SLUGS_ORDER = [
  TYPE_FILTER.GENDER,
  TYPE_FILTER.BRANDS,
  TYPE_FILTER.CATEGORIES,
];
