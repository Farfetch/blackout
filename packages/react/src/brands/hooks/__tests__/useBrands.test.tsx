import { cleanup, renderHook } from '@testing-library/react';
import { fetchBrands, resetBrandsState } from '@farfetch/blackout-redux';
import {
  mockErrorState,
  mockHash,
  mockInitialState,
  mockLoadingState,
  mockState,
} from 'tests/__fixtures__/brands';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useBrands } from '../../..';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  resetBrandsState: jest.fn(() => () => Promise.resolve()),
  fetchBrands: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (state = mockInitialState, config = {}) => {
  const {
    result: { current },
  } = renderHook(() => useBrands(config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useBrands', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly', () => {
    const current = getRenderedHook(mockState);

    expect(current).toEqual({
      isLoading: false,
      error: undefined,
      isFetched: true,
      data: {
        number: 1,
        totalPages: 1,
        totalItems: 30,
        entries: Object.values(mockState.entities.brands),
      },
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should return the loading state', () => {
    const { isLoading } = getRenderedHook(mockLoadingState);

    expect(isLoading).toBe(mockLoadingState?.brands.isLoading[mockHash]);
    expect(isLoading).toBe(true);
  });

  it('should return the error state', () => {
    const { error } = getRenderedHook(mockErrorState);

    expect(error).toEqual(mockErrorState.brands.error[mockHash]);
  });

  it('should return the fetched state', () => {
    const { isFetched } = getRenderedHook(mockState);

    expect(isFetched).toBe(true);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchBrands).toHaveBeenCalled();
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockState, {
        enableAutoFetch: false,
      });

      expect(fetchBrands).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook();

      fetch();

      expect(fetchBrands).toHaveBeenCalled();
    });

    it('should call `reset` action', () => {
      const {
        actions: { reset },
      } = getRenderedHook();

      reset();

      expect(resetBrandsState).toHaveBeenCalled();
    });
  });
});
