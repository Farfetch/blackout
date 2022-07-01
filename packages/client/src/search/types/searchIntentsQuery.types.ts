import type { Gender } from '../../types';

export type SearchIntentsQuery = {
  searchTerms: string;
  gender?: Gender;
};
