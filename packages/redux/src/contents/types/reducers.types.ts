import type {
  BlackoutError,
  ContentType,
  SEOMetadata,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type Hash = string;
export type Pathname = string;

export type SearchResultsState = {
  isLoading?: boolean;
  error?: BlackoutError | null;
  result?: {
    hash: Hash;
    number: number;
    totalPages: number;
    totalItems: number;
    entries: Hash[];
  };
};

export type ContentTypesState = {
  error?: BlackoutError;
  isLoading: boolean;
  result?: Array<ContentType['code']> | null;
};

export type MetadataReducer = {
  error: Record<Pathname, BlackoutError | null> | undefined;
  isLoading: Record<Pathname, boolean | undefined>;
  result: Record<Pathname, SEOMetadata | null> | null;
};

export type ContentsState = CombinedState<{
  searchResults: Record<Hash, SearchResultsState>;
  contentTypes: ContentTypesState;
  metadata: MetadataReducer;
}>;
