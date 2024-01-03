/**
 * Contains SearchType that are supported by default by the integrations
 * included in this package. To be used in analytics.track or analytics.page calls.
 */
enum SearchType {
  FreeText = 'Free Text',
  Percolators = 'Percolators',
  StopWords = 'Stop Words',
  Suggestion = 'Suggestion',
  DidYouMean = 'Did You Mean',
}

export default SearchType;
