import type { SearchSuggestionType } from './searchSuggestion.types.js';

export type SearchDidYouMeanSuggestion = {
  suggestion: string;
  type: SearchSuggestionType;
  resourceId: number;
  slug: string | null;
};
