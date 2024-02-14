import type { BlackoutError, PackagingOption } from '@farfetch/blackout-client';

export type PackagingOptionsState = {
  result: PackagingOption[] | null;
  isLoading: boolean;
  error: BlackoutError | null;
};
