import type { GenderCode } from '../../types';

export type SearchDidYouMeanQuery = {
  searchTerms: string;
  genders?: GenderCode[];
};
