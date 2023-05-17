import type { GenderCode } from '../../types/index.js';

export type GetSearchDidYouMeanQuery = {
  searchTerms: string;
  genders?: GenderCode[];
};
