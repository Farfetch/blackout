import type { Config, PagedResponse } from '../../../types';
import type { GetUserTitlesQuery } from './query.types';

export type Title = {
  id: string;
  value: string;
};

export type GetUserTitles = (
  query?: GetUserTitlesQuery,
  config?: Config,
) => Promise<PagedResponse<Title>>;
