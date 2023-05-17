import { cleanup, renderHook } from '@testing-library/react';
import { fetchCountryStates, type StoreState } from '@farfetch/blackout-redux';
import {
  mockCountriesEntities,
  mockCountry,
  mockCountryCode,
  mockCountryNormalized,
  mockLocaleState,
  mockStatesEntities,
} from 'tests/__fixtures__/locale/index.mjs';
import { withStore } from '../../../../tests/helpers/index.js';
import useCountryStates from '../useCountryStates.js';

const stateMockData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: mockCountriesEntities,
    states: mockStatesEntities,
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
  fetchCountryStates: jest.fn(() => () => Promise.resolve()),
}));

describe('useCountryStates', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCountryStates(mockCountryCode), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        countryStates: Object.values(mockStatesEntities),
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
    } = renderHook(() => useCountryStates(mockCountryCode), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          states: {
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
    } = renderHook(() => useCountryStates(mockCountryCode), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          states: {
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
      renderHook(() => useCountryStates(mockCountryCode), {
        wrapper: withStore(stateMockInitialData),
      });

      expect(fetchCountryStates).toHaveBeenCalledWith(
        mockCountryCode,
        undefined,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => useCountryStates(mockCountryCode, { enableAutoFetch: false }),
        {
          wrapper: withStore(stateMockInitialData),
        },
      );

      expect(fetchCountryStates).not.toHaveBeenCalled();
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
        () => useCountryStates(mockCountryCode, { enableAutoFetch: false }),
        {
          wrapper: withStore(stateMockData),
        },
      );

      await fetch(mockCountryCode);

      expect(fetchCountryStates).toHaveBeenCalledWith(mockCountryCode);
    });
  });
});
