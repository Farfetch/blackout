import type { CombinedState } from 'redux';
import type {
  ContentTypesEntries,
  SEOMetadata,
} from '@farfetch/blackout-client/contents/types';
import type { Error } from '@farfetch/blackout-client/types';

export type Hash = string;
export type Pathname = string;

export type SearchResultsReducer = {
  isLoading?: boolean;
  error?: Error | null;
  result?: {
    hash: Hash;
    number: number;
    totalPages: number;
    totalItems: number;
    entries: Hash[];
  };
};

export type ContentTypesReducer = {
  error?: Error;
  isLoading: boolean;
  result?: Array<ContentTypesEntries['code']> | null;
};

export type MetadataReducer = {
  error: Record<Pathname, Error | null> | undefined;
  isLoading: Record<Pathname, boolean | undefined>;
  result: Record<Pathname, SEOMetadata | null> | null;
};

export type State = CombinedState<{
  searchResults: Record<Hash, SearchResultsReducer>;
  contentTypes: ContentTypesReducer;
  metadata: MetadataReducer;
}>;
