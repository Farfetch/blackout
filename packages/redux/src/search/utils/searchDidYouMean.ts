/*
 * Constants to help understanding the type property from the
 * fetchSearchDidYouMean action result.
 */

/*
 * The type property is a numeric that indicates whether the facet is one of
 * the following options:
 * - category (type=1)
 * - brand (type=2)
 * - merchant (type=3)
 * - other (type=4)
 * .*/
export const TYPE_DID_YOU_MEAN = {
  CATEGORY: 1,
  BRAND: 2,
  MERCHANT: 3,
  OTHER: 4,
} as const;
