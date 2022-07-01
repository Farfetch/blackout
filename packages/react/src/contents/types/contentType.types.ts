import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux';

export type UseContentType = {
  contentType: GetContents;
  isContentTypeLoading: IsContentLoading;
  contentTypeError: GetContentError;
  fetchContentType: () => void;
};
