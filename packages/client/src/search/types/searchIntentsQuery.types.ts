import type { GenderEnum } from '../../types';

export type SearchIntentsQuery = {
  searchTerms: string;
  gender?: GenderEnum;
};
