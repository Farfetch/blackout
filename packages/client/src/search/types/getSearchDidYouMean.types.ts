import type { Config } from '../../index.js';
import type { GetSearchDidYouMeanQuery } from './searchDidYouMeanQuery.types.js';
import type { SearchDidYouMeanSuggestion } from './searchDidYouMean.types.js';

export type GetSearchDidYouMean = (
  query: GetSearchDidYouMeanQuery,
  config?: Config,
) => Promise<SearchDidYouMeanSuggestion[]>;
