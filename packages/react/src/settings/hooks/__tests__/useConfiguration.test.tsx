import { cleanup, renderHook } from '@testing-library/react';
import { fetchConfiguration } from '@farfetch/blackout-redux';
import {
  mockConfigurationCode,
  mockConfigurationErrorState,
  mockConfigurationLoadingState,
  mockConfigurationsInitialState,
  mockConfigurationsState,
} from 'tests/__fixtures__/settings';
import { useConfiguration } from '../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchConfiguration: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state = mockConfigurationsInitialState,
  config = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useConfiguration(mockConfigurationCode, config), {
    wrapper: withStore(state),
  });

  return current;
};

describe('useConfiguration', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockConfigurationsState);

    expect(current).toStrictEqual({
      isFetched: true,
      isLoading: false,
      data: mockConfigurationsState.entities.configurations[
        mockConfigurationCode
      ],
      error: null,
      actions: {
        fetch: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly', () => {
    const data = getRenderedHook(mockConfigurationLoadingState);

    expect(data.isLoading).toBe(
      mockConfigurationLoadingState.settings.configurations.configuration
        .isLoading[mockConfigurationCode],
    );
  });

  it('should return the error state correctly', () => {
    const data = getRenderedHook(mockConfigurationErrorState);

    expect(data.error).toEqual(
      mockConfigurationErrorState.settings.configurations.configuration.error[
        mockConfigurationCode
      ],
    );
  });

  it('should return the fetched state correctly', () => {
    const { isFetched } = getRenderedHook(mockConfigurationsState);

    expect(isFetched).toBe(true);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchConfiguration).toHaveBeenCalledWith(
        mockConfigurationCode,
        undefined,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockConfigurationsState, {
        enableAutoFetch: false,
      });

      expect(fetchConfiguration).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook(mockConfigurationsState);

      fetch();

      expect(fetchConfiguration).toHaveBeenCalled();
    });

    it('should not call `fetchConfiguration` if `configurationCode` is not set', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },

        // @ts-expect-error Cannot set configurationCode to null/undefined if it exists
      } = renderHook(() => useConfiguration(null, { enableAutoFetch: false }), {
        wrapper: withStore(mockConfigurationsInitialState),
      });

      await expect(() => fetch()).rejects.toThrow(
        'Invalid parameter `configurationCode` for `fetch`',
      );

      expect(fetchConfiguration).not.toHaveBeenCalled();
    });
  });
});
