import type {
  AddressPrediction,
  AddressPredictions,
} from '@farfetch/blackout-client/src/addresses/types';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithResult,
  StateWithResultArray,
} from '../../types';

export type State = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  predictions: StateWithResultArray<AddressPredictions>;
  prediction: StateWithResult<AddressPrediction>;
}>;
