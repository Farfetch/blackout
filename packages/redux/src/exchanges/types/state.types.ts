import type {
  BlackoutError,
  Exchange,
  ExchangeBookRequest,
  ExchangeFilter,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable, StateWithResult } from '../../index.js';

export type ExchangesState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: Nullable<Exchange>;
  exchangeFilter: StateWithResult<ExchangeFilter>;
  exchangeBookRequest: StateWithResult<ExchangeBookRequest>;
}>;
