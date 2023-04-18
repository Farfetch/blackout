import type { GenderCode } from '../../types/index.js';

export type GetSearchIntentsQuery = {
  searchTerms: string;
  gender?: GenderCode;
};
