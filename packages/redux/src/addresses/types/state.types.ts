import type {
  AddressPrediction,
  AddressPredictionDetails,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { StateWithResult } from '../../types';

export type AddressesState = CombinedState<{
  predictions: StateWithResult<AddressPrediction[]>;
  prediction: StateWithResult<AddressPredictionDetails>;
}>;
