import type { GenderCode } from '../../types/index.js';

export type SearchIntentsQuery = {
  searchTerms: string;
  gender?: GenderCode;
};
