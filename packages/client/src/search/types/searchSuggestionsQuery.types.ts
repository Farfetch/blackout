import type { Gender } from '../../types';

export type SearchSuggestionsQuery = {
  query: string;
  gender?: Gender;
  ignoreFilterExclusions?: boolean;
};
