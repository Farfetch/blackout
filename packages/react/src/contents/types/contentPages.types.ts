import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux/contents/types';

/**
 * @enum {ContentType}
 */
export enum ContentType {
  'PRODUCT',
  'LISTING',
  'SET',
}

export type UseContentPages = {
  contentPage: GetContents;
  resetContents: () => void;
  isLoading: IsContentLoading;
  error: GetContentError;
  fetchContentPages: () => void;
};
