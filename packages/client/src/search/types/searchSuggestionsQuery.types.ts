import type { GenderEnum } from '../../types';

export type SearchSuggestionsQuery = {
  query: string;
  gender?: GenderEnum;
  ignoreFilterExclusions?: boolean;
};
