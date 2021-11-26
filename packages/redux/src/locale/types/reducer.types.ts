import type { CombinedState } from 'redux';

export type State = CombinedState<{
  countryCode: string | null;
  cities: {
    error: Error | null;
    isLoading: boolean;
  };
  countries: {
    error: Error | null;
    isLoading: boolean;
  };
  currencies: {
    error: Error | null;
    isLoading: boolean;
  };
  states: {
    error: Error | null;
    isLoading: boolean;
  };
}>;
