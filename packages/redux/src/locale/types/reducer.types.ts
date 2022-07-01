import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { StateWithoutResult } from '../../types';

export type LocaleState = CombinedState<{
  countryCode: string | null;
  sourceCountryCode: string | null;
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
  countryAddressSchema: StateWithoutResult;
}>;
