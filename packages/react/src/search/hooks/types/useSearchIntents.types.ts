import type {
  BlackoutError,
  Config,
  SearchIntents,
  SearchIntentsQuery,
} from '@farfetch/blackout-client';

export type UseSearchIntents = (baseUrl?: string) => {
  fetchSearchIntents: (
    query: SearchIntentsQuery,
    config?: Config,
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
