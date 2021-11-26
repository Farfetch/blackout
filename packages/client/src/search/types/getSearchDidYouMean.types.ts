import type { SearchDidYouMean } from './searchDidYouMean.types';
import type { SearchDidYouMeanQuery } from './searchDidYouMeanQuery.types';

export type GetSearchDidYouMean = (
  query: SearchDidYouMeanQuery,
  config?: Record<string, unknown>,
) => Promise<SearchDidYouMean[]>;
