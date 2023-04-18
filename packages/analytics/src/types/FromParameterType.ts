/**
 * Contains types to used on the `from` parameter that are supported by default by the integrations included in
 * this package. To be used in analytics.track or analytics.page calls.
 */
enum FromParameterType {
  Bag = 'Bag',
  Wishlist = 'Wishlist',
  Plp = 'Plp',
  Pdp = 'Pdp',
  Recommendations = 'Recommendations',
  RecentlyViewed = 'Recently Viewed',
  Editorial = 'Editorial',
  Other = 'Other',
}

export default FromParameterType;
