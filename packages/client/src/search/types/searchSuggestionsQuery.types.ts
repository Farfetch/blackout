import type { GenderCode } from '../../types';

export type SearchSuggestionsQuery = {
  query: string;
  gender?: GenderCode;
  ignoreFilterExclusions?: boolean;
};
