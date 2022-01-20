import type { Config } from '../../types';
import type { GetTitlesQuery } from './query.types';

export type GetTitlesResponse = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: {
    id: string;
    value: string;
  };
};

export type GetTitles = (
  query: GetTitlesQuery,
  config?: Config,
) => Promise<GetTitlesResponse>;
