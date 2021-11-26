import type { GenderEnum } from '../../types';

enum TypeEnum {
  Category = 1,
  Brand,
  Merchant,
  Other,
}

export type SearchSuggestion = {
  gender: GenderEnum;
  id: number;
  suggestion: string;
  type: TypeEnum;
  matchesSearch: boolean;
  typeName: string;
  url: string;
  numberOfResults: number;
};
