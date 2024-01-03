/**
 * Contains types to used on the `from` parameter that are supported by default by the integrations included in
 * this package. To be used in analytics.track or analytics.page calls.
 */
enum FromParameterType {
  Bag = 'Bag',
  DidYouMean = 'Did you mean',
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
  PopularSearches = 'Popular Searches',
  QuickShop = 'Quick Shop',
  RecentlyViewed = 'Recently Viewed',
  RecentSearches = 'Recent Searches',
  Recommendations = 'Recommendations',
  SearchPreview = 'Search Preview',
  SearchSuggestion = 'Search Suggestion',
  Search = 'Search',
  Wishlist = 'Wishlist',
}

export default FromParameterType;
