import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux/contents/types';

export type UsePage = {
  page: GetContents;
  resetContent: () => void;
  isLoading: IsContentLoading;
  error: GetContentError;
  fetchContent: () => void;
};
