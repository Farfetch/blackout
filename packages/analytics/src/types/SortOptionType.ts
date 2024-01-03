/**
 * Contains SortOptionType that are supported by default by the integrations
 * included in this package. To be used in analytics.track or analytics.page calls.
 */
enum SortOptionType {
  OurPicks = 'Our Picks',
  NewestFirst = 'Newest First',
  PriceHighToLow = 'Price: high to low',
  PriceLowToHigh = 'Price: low to high',
  Discount = 'Discount',
  UploadedDate = 'Uploaded date',
  Ranking = 'Ranking',
}

export default SortOptionType;
