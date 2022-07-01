import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux';

export type UseCommercePages = {
  commercePage: GetContents;
  resetContents: () => void;
  isLoading: IsContentLoading;
  error: GetContentError;
  fetchCommercePages: () => void;
};
