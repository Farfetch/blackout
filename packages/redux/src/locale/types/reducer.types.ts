import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type State = CombinedState<{
  countryCode: string | null;
  cities: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  countries: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  currencies: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  states: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
}>;
