import type {
  BlackoutError,
  ContentEntry,
  ContentType,
  SEOMetadata,
  Targets,
} from '@farfetch/blackout-client';
import type { SearchResultsState } from '../types';

type DefaultError = BlackoutError | null | undefined;
type DefaultBoolean = boolean | undefined;

export type QueryContentHash = {
  // List of codes that representing the content code (about-us|today-news|header|productId...).
  codes?: string | string[];
  // The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
  contentTypeCode: string;
  // The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
  target?: Targets;
  // Number of the page to get, starting at 1. The default is 1.
  page?: number;
  // Size of each page, as a number between 1 and 180. The default is 60.
  pageSize?: number;
};

export type GetContentsByHash = SearchResultsState | undefined;
export type GetContentError = DefaultError;
export type GetContentByQuery = SearchResultsState['result'] | undefined;
export type GetContents = ContentEntry[] | undefined;
export type GetAllContentTypes = Array<ContentType['code']> | null | undefined;
export type GetSEOError = DefaultError;
export type IsContentLoading = DefaultBoolean;
export type IsSEOLoading = DefaultBoolean;
export type GetSEO = SEOMetadata | null | undefined;