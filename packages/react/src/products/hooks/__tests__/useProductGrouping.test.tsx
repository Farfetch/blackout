import { fetchProductGrouping } from '@farfetch/blackout-redux';
import {
  mockProductGroupingAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductGrouping from '../useProductGrouping';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductGrouping: jest.fn(() => () => Promise.resolve()),
}));

describe('useProductGrouping', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const { result } = renderHook(() => useProductGrouping(mockProductId), {
      wrapper: withStore(mockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: null,
      isFetched: true,
      isLoading: false,
      data: mockProductGroupingAdapted,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        grouping: {
          error: {
            [mockProductId]: 'Error - Not loaded.',
          },
          isLoading: {
            [mockProductId]: false,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductGrouping(mockProductId), {
      wrapper: withStore(errorMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: 'Error - Not loaded.',
      isFetched: true,
      isLoading: false,
      data: undefined,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return loading state', () => {
    const loadingMockProductsState = {
      entities: {},
      products: {
        grouping: {
          error: {},
          isLoading: {
            [mockProductId]: true,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductGrouping(mockProductId), {
      wrapper: withStore(loadingMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: undefined,
      isFetched: false,
      isLoading: true,
      data: undefined,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          grouping: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchQuery: {},
        fetchConfig: { headers: { 'X-Test-Header': 'test' } },
      };

      renderHook(() => useProductGrouping(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductGrouping).toHaveBeenCalledWith(
        mockProductId,
        options.fetchQuery,
        options.fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useProductGrouping(mockProductId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      expect(fetchProductGrouping).not.toHaveBeenCalled();
    });

    it('should fetch data with fetchQuery', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          grouping: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchQuery: { pageIndex: 1, pageSize: 100 },
        fetchConfig: {},
      };

      renderHook(() => useProductGrouping(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductGrouping).toHaveBeenCalledWith(
        mockProductId,
        options.fetchQuery,
        options.fetchConfig,
      );
    });
  });

  describe('actions', () => {
    it('should call `refetch` action successfully', () => {
      const {
        result: {
          current: {
            actions: { refetch },
          },
        },
      } = renderHook(() => useProductGrouping(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      refetch();

      expect(fetchProductGrouping).toHaveBeenCalledWith(
        mockProductId,
        { pageIndex: 1 },
        undefined,
      );
    });
  });
});
