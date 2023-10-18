/**
 * Contains types to used on the `from` parameter that are supported by default by the integrations included in
 * this package. To be used in analytics.track or analytics.page calls.
 */
enum FromParameterType {
  Bag = 'Bag',
  Editorial = 'Editorial',
  Hero = 'Hero',
  Homepage = 'Homepage',
  MiniBag = 'Mini Bag',
  MiniPdp = 'Mini Pdp',
  MiniWishlist = 'Mini Wishlist',
  Navigation = 'Navigation',
  Other = 'Other',
  Pdp = 'Pdp',
  Plp = 'Plp',
  QuickShop = 'Quick Shop',
  RecentlyViewed = 'Recently Viewed',
  Recommendations = 'Recommendations',
  SearchPreview = 'Search Preview',
  SearchSuggestion = 'Search Suggestion',
  Search = 'Search',
  Wishlist = 'Wishlist',
}

export default FromParameterType;
