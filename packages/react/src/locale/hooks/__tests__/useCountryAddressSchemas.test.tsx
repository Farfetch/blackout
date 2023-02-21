import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCountryAddressSchemas,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  isoCode,
  mockCountry,
  mockCountryNormalized,
  mockGetAddressSchemaResponse,
  mockLocaleState,
} from 'tests/__fixtures__/locale';
import { withStore } from '../../../../tests/helpers';
import useCountryAddressSchemas from '../useCountryAddressSchemas';

const stateMockData: StoreState = {
  ...mockLocaleState,
  entities: {
    countriesAddressSchemas: {
      [isoCode]: mockGetAddressSchemaResponse,
    },
  },
};

const stateMockInitialData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: {
      [mockCountry.code]: { ...mockCountryNormalized, states: undefined },
    },
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCountryAddressSchemas: jest.fn(() => () => Promise.resolve()),
}));

describe('useCountryAddressSchemas', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCountryAddressSchemas(isoCode), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        countryAddressSchemas: mockGetAddressSchemaResponse,
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
      code: '500',
    };

    const {
      result: {
        current: { error, isFetched },
      },
    } = renderHook(() => useCountryAddressSchemas(isoCode), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          countriesAddressSchemas: {
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
    } = renderHook(() => useCountryAddressSchemas(isoCode), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          countriesAddressSchemas: {
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
      renderHook(() => useCountryAddressSchemas(isoCode), {
        wrapper: withStore(stateMockInitialData),
      });

      expect(fetchCountryAddressSchemas).toHaveBeenCalledWith(
        isoCode,
        undefined,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => useCountryAddressSchemas(isoCode, { enableAutoFetch: false }),
        {
          wrapper: withStore(stateMockInitialData),
        },
      );

      expect(fetchCountryAddressSchemas).not.toHaveBeenCalled();
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
      } = renderHook(
        () => useCountryAddressSchemas(isoCode, { enableAutoFetch: false }),
        {
          wrapper: withStore(stateMockData),
        },
      );

      await fetch(isoCode);

      expect(fetchCountryAddressSchemas).toHaveBeenCalledWith(isoCode);
    });
  });
});
