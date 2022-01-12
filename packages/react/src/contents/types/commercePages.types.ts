import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux/contents/types';

export type UseCommercePages = {
  commercePage: GetContents;
  resetContents: () => void;
  isLoading: IsContentLoading;
  error: GetContentError;
  fetchCommercePages: () => void;
};
