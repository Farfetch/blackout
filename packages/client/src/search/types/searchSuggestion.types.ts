import type { GenderCode } from '../../types/index.js';

export enum SearchSuggestionType {
  Category = 1,
  Brand,
  Merchant,
  Other,
}

export type SearchSuggestion = {
  gender: GenderCode;
  id: number;
  suggestion: string;
  type: SearchSuggestionType;
  matchesSearch: boolean;
  typeName: string;
  url: string;
  numberOfResults: number;
};
