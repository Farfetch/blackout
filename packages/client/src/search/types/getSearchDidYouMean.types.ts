import type { Config } from '../..';
import type { SearchDidYouMeanQuery } from './searchDidYouMeanQuery.types';
import type { SearchDidYouMeanSuggestion } from './searchDidYouMean.types';

export type GetSearchDidYouMean = (
  query: SearchDidYouMeanQuery,
  config?: Config,
) => Promise<SearchDidYouMeanSuggestion[]>;
