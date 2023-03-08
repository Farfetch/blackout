import type { Config, PagedResponse } from '../../../types/index.js';
import type { GetUserTitlesQuery } from './query.types.js';

export type Title = {
  id: string;
  value: string;
};

export type GetUserTitles = (
  query?: GetUserTitlesQuery,
  config?: Config,
) => Promise<UserTitles>;

export type UserTitles = PagedResponse<Title>;
