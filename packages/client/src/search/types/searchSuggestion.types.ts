import type { Gender } from '../../types';

export enum SearchSuggestionType {
  Category = 1,
  Brand,
  Merchant,
  Other,
}

export type SearchSuggestion = {
  gender: Gender;
  id: number;
  suggestion: string;
  type: SearchSuggestionType;
  matchesSearch: boolean;
  typeName: string;
  url: string;
  numberOfResults: number;
};
