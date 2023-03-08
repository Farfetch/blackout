import type { GenderCode } from '../../types/index.js';

export type SearchSuggestionsQuery = {
  query: string;
  gender?: GenderCode;
  ignoreFilterExclusions?: boolean;
};
