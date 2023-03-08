import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCountryStateCities,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  mockCities,
  mockCitiesEntities,
  mockCountriesEntities,
  mockCountry,
  mockCountryCode,
  mockCountryNormalized,
  mockLocaleState,
  mockStateId,
  mockStatesEntities,
} from 'tests/__fixtures__/locale/index.mjs';
import { withStore } from '../../../../tests/helpers/index.js';
import useCountryStateCities from '../useCountryStateCities.js';

const stateMockData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: mockCountriesEntities,
    states: mockStatesEntities,
    cities: mockCitiesEntities,
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
  fetchCountryStateCities: jest.fn(() => () => Promise.resolve()),
}));

describe('useCountryStateCities', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCountryStateCities(mockCountryCode, mockStateId), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        countryStateCities: mockCities.filter(
          city => city.stateId === mockStateId,
        ),
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
    } = renderHook(() => useCountryStateCities(mockCountryCode, mockStateId), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          cities: {
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
    } = renderHook(() => useCountryStateCities(mockCountryCode, mockStateId), {
      wrapper: withStore({
        ...stateMockData,
        locale: {
          ...stateMockData.locale!,
          cities: {
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
      renderHook(() => useCountryStateCities(mockCountryCode, mockStateId), {
        wrapper: withStore(stateMockInitialData),
      });

      expect(fetchCountryStateCities).toHaveBeenCalledWith(
        mockCountryCode,
        mockStateId,
        undefined,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useCountryStateCities(mockCountryCode, mockStateId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(stateMockInitialData),
        },
      );

      expect(fetchCountryStateCities).not.toHaveBeenCalled();
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
        () =>
          useCountryStateCities(mockCountryCode, mockStateId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(stateMockData),
        },
      );

      await fetch(mockCountryCode, mockStateId);

      expect(fetchCountryStateCities).toHaveBeenCalledWith(
        mockCountryCode,
        mockStateId,
      );
    });
  });
});
