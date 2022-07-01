import type { SearchSuggestionType } from './searchSuggestion.types';

export type SearchDidYouMeanSuggestion = {
  suggestion: string;
  type: SearchSuggestionType;
  resourceId: number;
  slug: string | null;
};
