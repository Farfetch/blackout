import { cleanup, renderHook } from '@testing-library/react';
import { fetchBrand } from '@farfetch/blackout-redux';
import {
  mockBrandId,
  mockErrorState,
  mockHash,
  mockInitialState,
  mockLoadingState,
  mockState,
} from 'tests/__fixtures__/brands';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useBrand } from '../../..';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchBrand: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (state = mockInitialState, config = {}) => {
  const {
    result: { current },
  } = renderHook(() => useBrand(mockBrandId, config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useBrand', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly', () => {
    const current = getRenderedHook(mockState);

    expect(current).toStrictEqual({
      isLoading: false,
      error: undefined,
      isFetched: true,
      data: mockState.entities.brands[mockBrandId],
      actions: {
        fetch: expect.any(Function),
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

      expect(fetchBrand).toHaveBeenCalledWith(mockBrandId, undefined);
    });

    it('should not call fetch brand if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockState, {
        enableAutoFetch: false,
      });

      expect(fetchBrand).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook();

      fetch();

      expect(fetchBrand).toHaveBeenCalled();
    });
  });
});
