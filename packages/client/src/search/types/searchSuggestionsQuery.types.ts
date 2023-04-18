import type { GenderCode } from '../../types/index.js';

export type GetSearchSuggestionsQuery = {
  query: string;
  gender?: GenderCode;
  ignoreFilterExclusions?: boolean;
};
