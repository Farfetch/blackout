import type { Config } from '../../index.js';
import type { SearchDidYouMeanQuery } from './searchDidYouMeanQuery.types.js';
import type { SearchDidYouMeanSuggestion } from './searchDidYouMean.types.js';

export type GetSearchDidYouMean = (
  query: SearchDidYouMeanQuery,
  config?: Config,
) => Promise<SearchDidYouMeanSuggestion[]>;
