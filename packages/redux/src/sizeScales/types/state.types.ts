import type { BlackoutError, SizeScale } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SizeScalesState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  sizeScale: {
    // It can either be the `sizeScaleId` or a string `categoryId_${categoryId}`
    error: Record<SizeScale['sizeScaleId'] | string, BlackoutError | undefined>;
    isLoading: Record<SizeScale['sizeScaleId'] | string, boolean | undefined>;
  };
}>;
