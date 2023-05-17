import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { StateWithoutResult } from '../../types/index.js';

export type LocaleState = CombinedState<{
  countryCode: string;
  subfolder: string | null;
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
  countriesAddressSchemas: StateWithoutResult;
}>;
