import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type {
  SizeScale,
  SizeScaleMapping,
} from '@farfetch/blackout-client/sizeScales/types';

export type State = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  sizeScale: {
    // It can either be the `sizeScaleId` or a string `categoryId_${categoryId}`
    error: Record<SizeScale['sizeScaleId'] | string, BlackoutError | undefined>;
    isLoading: Record<SizeScale['sizeScaleId'] | string, boolean | undefined>;
  };
  mappings: {
    error: Record<string, BlackoutError | undefined>;
    isLoading: Record<string, boolean>;
    result: Record<string, SizeScaleMapping>;
  };
}>;
