import type {
  ContentEntries,
  ContentTypesEntries,
  SEOMetadata,
  Targets,
} from '@farfetch/blackout-client/contents/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { SearchResultsReducer } from '../types';

type DefaultError = Error | null | undefined;
type DefaultBoolean = boolean | undefined;

export type QueryContentHash = {
  codes?: string | string[];
  contentTypeCode: string;
  target?: Targets;
  page?: number;
  pageSize?: number;
};

export type QuerySEO = {
  pageType: string;
  param: string;
  path: string;
  subPageType: string;
};

export type GetContentsByHash = SearchResultsReducer | undefined;
export type GetContentError = DefaultError;
export type GetContentByQuery = SearchResultsReducer['result'] | undefined;
export type GetContents = ContentEntries[] | undefined;
export type GetAllContentTypes =
  | Array<ContentTypesEntries['code']>
  | null
  | undefined;
export type GetSEOError = DefaultError;
export type IsContentLoading = DefaultBoolean;
export type IsSEOLoading = DefaultBoolean;
export type GetSEO = SEOMetadata | null | undefined;
