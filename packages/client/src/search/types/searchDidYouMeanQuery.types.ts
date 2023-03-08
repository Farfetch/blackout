import type { GenderCode } from '../../types/index.js';

export type SearchDidYouMeanQuery = {
  searchTerms: string;
  genders?: GenderCode[];
};
