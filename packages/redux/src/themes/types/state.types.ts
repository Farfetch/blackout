import type { BlackoutError, Theme } from '@farfetch/blackout-client';

export type ThemeState = {
  error: Record<Theme['code'], BlackoutError | undefined>;
  isLoading: Record<Theme['code'], boolean | undefined>;
  result: Record<Theme['code'], Theme>;
};
