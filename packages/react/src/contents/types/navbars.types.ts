import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux';

export type UseNavbars = {
  navigation: GetContents;
  isNavigationLoading: IsContentLoading;
  navigationError: GetContentError;
  fetchNavbars: () => void;
};
