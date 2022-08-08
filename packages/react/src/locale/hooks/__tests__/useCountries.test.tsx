import { cleanup, renderHook } from '@testing-library/react';
import { fetchCountries, StoreState } from '@farfetch/blackout-redux';
import {
  mockCountriesEntities,
  mockCountry,
  mockCountryNormalized,
  mockCountryPT,
  mockLocaleState,
} from 'tests/__fixtures__/locale';
import { withStore } from '../../../../tests/helpers';
import useCountries from '../useCountries';

const stateMockData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: mockCountriesEntities,
  },
};

const stateMockInitialData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: {
      [mockCountry.code]: mockCountryNormalized,
    },
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCountries: jest.fn(() => () => Promise.resolve()),
}));

describe('useCountries', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCountries(), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        countries: mockCountriesEntities,
        countriesById: {
          [mockCountry.platformId]: mockCountryNormalized,
          [mockCountryPT.platformId]: mockCountryPT,
        },
      },
      actions: {
        fetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const mockError = {
      message: 'This is an error message',
      name: 'error',
      code: 500,
    };

    const {
      result: {
        current: { error, isFetched },
      },
    } = renderHook(() => useCountries(), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale,
          countries: {
            error: mockError,
            isLoading: false,
          },
        },
      }),
    });

    expect(error).toEqual(mockError);
    expect(isFetched).toBe(true);
  });

  it('should return loading state', () => {
    const {
      result: {
        current: { isLoading, isFetched },
      },
    } = renderHook(() => useCountries(), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale,
          countries: {
            error: null,
            isLoading: true,
          },
        },
      }),
    });

    expect(isLoading).toBe(true);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is true', () => {
      renderHook(() => useCountries(), {
        wrapper: withStore(stateMockInitialData),
      });

      expect(fetchCountries).toHaveBeenCalledWith(undefined);
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => useCountries({ enableAutoFetch: false }), {
        wrapper: withStore(stateMockInitialData),
      });

      expect(fetchCountries).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useCountries({ enableAutoFetch: false }), {
        wrapper: withStore(stateMockData),
      });

      await fetch();

      expect(fetchCountries).toHaveBeenCalledTimes(1);
    });
  });
});
