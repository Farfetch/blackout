import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  SearchIntents,
  SearchIntentsQuery,
} from '@farfetch/blackout-client/search/types';

export type UseSearchIntents = (baseUrl?: string) => {
  fetchSearchIntents: (
    query: SearchIntentsQuery,
    config?: Record<string, unknown>,
  ) => Promise<SearchIntents>;
  resetSearchIntents: () => void;
  error: BlackoutError | null;
  isLoading: boolean;
  searchIntents: SearchIntents | null;
  searchRedirectUrl?: string | null;
};

export type GetSearchRedirectUrl = (
  searchIntents: SearchIntents,
  baseUrl: string,
) => string | undefined;
