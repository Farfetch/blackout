/**
 * Contains fromTypes that are supported by default by the integrations included in
 * this package. To be used in analytics.track or analytics.page calls.
 */
enum FromParameterTypes {
  BAG = 'Bag',
  WISHLIST = 'Wishlist',
  PLP = 'PLP',
  PDP = 'PDP',
  RECOMMENDATIONS = 'Recommendations',
  RECENTLY_VIEWED = 'Recently Viewed',
  EDITORIAL = 'Editorial',
  OTHER = 'Other',
}

export default FromParameterTypes;
