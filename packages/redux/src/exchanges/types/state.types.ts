import type {
  BlackoutError,
  Exchange,
  ExchangeBookRequest,
  ExchangeFilterItem,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable, StateWithResult } from '../../index.js';

export type ExchangeFiltersState = {
  error: Record<ExchangeFilterItem['orderItemUuid'], BlackoutError | null>;
  isLoading: Record<ExchangeFilterItem['orderItemUuid'], boolean>;
};

export type ExchangesState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: Nullable<Exchange>;
  exchangeFilters: ExchangeFiltersState;
  exchangeBookRequest: StateWithResult<ExchangeBookRequest>;
}>;
