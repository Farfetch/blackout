import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type {
  ContentTypesEntries,
  SEOMetadata,
} from '@farfetch/blackout-client/contents/types';

export type Hash = string;
export type Pathname = string;

export type SearchResultsReducer = {
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

export type ContentTypesReducer = {
  error?: BlackoutError;
  isLoading: boolean;
  result?: Array<ContentTypesEntries['code']> | null;
};

export type MetadataReducer = {
  error: Record<Pathname, BlackoutError | null> | undefined;
  isLoading: Record<Pathname, boolean | undefined>;
  result: Record<Pathname, SEOMetadata | null> | null;
};

export type State = CombinedState<{
  searchResults: Record<Hash, SearchResultsReducer>;
  contentTypes: ContentTypesReducer;
  metadata: MetadataReducer;
}>;
