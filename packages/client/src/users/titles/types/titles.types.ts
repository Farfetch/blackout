import type { Config } from '../../../types';
import type { GetUserTitlesQuery } from './query.types';

export type GetUserTitlesResponse = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: {
    id: string;
    value: string;
  }[];
};

export type GetUserTitles = (
  query?: GetUserTitlesQuery,
  config?: Config,
) => Promise<GetUserTitlesResponse>;
