import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchConfigurations,
  resetConfigurationsState,
} from '@farfetch/blackout-redux';
import {
  mockConfigurationsErrorState,
  mockConfigurationsInitialState,
  mockConfigurationsLoadingState,
  mockConfigurationsState,
} from 'tests/__fixtures__/settings';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useConfigurations } from '../../';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  resetConfigurationsState: jest.fn(() => () => Promise.resolve()),
  fetchConfigurations: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state = mockConfigurationsInitialState,
  config = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useConfigurations(config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useConfigurations', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockConfigurationsState);

    expect(current).toStrictEqual({
      isFetched: true,
      isLoading: false,
      data: mockConfigurationsState.entities.configurations,
      error: null,
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly', () => {
    const { isLoading } = getRenderedHook(mockConfigurationsLoadingState);

    expect(isLoading).toBe(
      mockConfigurationsLoadingState.settings.configurations.isLoading,
    );
  });

  it('should return the error state correctly', () => {
    const { error } = getRenderedHook(mockConfigurationsErrorState);

    expect(error).toEqual(
      mockConfigurationsErrorState.settings.configurations.error,
    );
  });

  it('should return the fetched state correctly', () => {
    const { isFetched } = getRenderedHook(mockConfigurationsState);

    expect(isFetched).toBe(true);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchConfigurations).toHaveBeenCalled();
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockConfigurationsInitialState, {
        enableAutoFetch: false,
      });

      expect(fetchConfigurations).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `reset` action', () => {
      const {
        actions: { reset },
      } = getRenderedHook();

      reset();

      expect(resetConfigurationsState).toHaveBeenCalled();
    });

    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook(mockConfigurationsState);

      fetch();

      expect(fetchConfigurations).toHaveBeenCalled();
    });
  });
});
