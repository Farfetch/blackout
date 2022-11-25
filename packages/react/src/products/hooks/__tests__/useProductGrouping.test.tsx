import { fetchProductGrouping } from '@farfetch/blackout-redux';
import {
  mockProductGroupingAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductGrouping from '../useProductGrouping';
import type { BlackoutError } from '@farfetch/blackout-client';

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
      error: undefined,
      isFetched: true,
      isLoading: false,
      data: mockProductGroupingAdapted,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const mockError = new Error('Error - Not loaded.') as BlackoutError;

    const errorMockProductsState = {
      entities: {},
      products: {
        ...mockProductsState.products,
        grouping: {
          ...mockProductsState.products.grouping,
          results: {},
          error: {
            [mockProductId]: {
              '?pageindex=1': mockError,
            },
          },
          isLoading: {
            [mockProductId]: { '?pageindex=1': false },
          },
        },
      },
    };

    const { result } = renderHook(() => useProductGrouping(mockProductId), {
      wrapper: withStore(errorMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: mockError,
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
        ...mockProductsState.products,
        grouping: {
          ...mockProductsState.products.grouping,
          error: {},
          isLoading: {
            [mockProductId]: { '?pageindex=1': true },
          },
          results: {},
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
          ...mockProductsState.products,
          grouping: {
            ...mockProductsState.products.grouping,
            error: {},
            isLoading: {},
            results: {},
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
      const initialMockProductsState = {
        entities: {},
        products: {
          ...mockProductsState.products,
          grouping: {
            error: {},
            isLoading: {},
            results: {},
          },
        },
      };

      renderHook(
        () =>
          useProductGrouping(mockProductId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(initialMockProductsState),
        },
      );

      expect(fetchProductGrouping).not.toHaveBeenCalled();
    });

    it('should fetch data with fetchQuery', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          ...mockProductsState.products,
          grouping: {
            error: {},
            isLoading: {},
            results: {},
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
