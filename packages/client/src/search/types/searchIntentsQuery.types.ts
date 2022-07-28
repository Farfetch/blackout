import type { GenderCode } from '../../types';

export type SearchIntentsQuery = {
  searchTerms: string;
  gender?: GenderCode;
};
