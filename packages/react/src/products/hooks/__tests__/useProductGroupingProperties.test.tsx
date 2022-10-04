import { fetchProductGroupingProperties } from '@farfetch/blackout-redux';
import {
  mockProductGroupingPropertiesAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductGroupingProperties from '../useProductGroupingProperties';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductGroupingProperties: jest.fn(() => () => Promise.resolve()),
}));

describe('useProductGroupingProperties', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const { result } = renderHook(
      () => useProductGroupingProperties(mockProductId),
      {
        wrapper: withStore(mockProductsState),
      },
    );

    expect(result.current).toStrictEqual({
      error: null,
      isFetched: true,
      isLoading: false,
      data: mockProductGroupingPropertiesAdapted,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        groupingProperties: {
          error: {
            [mockProductId]: { '!all': 'Error - Not loaded.' },
          },
          isLoading: {
            [mockProductId]: { '!all': false },
          },
        },
      },
    };

    const { result } = renderHook(
      () => useProductGroupingProperties(mockProductId),
      {
        wrapper: withStore(errorMockProductsState),
      },
    );

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
        groupingProperties: {
          error: {},
          isLoading: {
            [mockProductId]: { '!all': true },
          },
        },
      },
    };

    const { result } = renderHook(
      () => useProductGroupingProperties(mockProductId),
      {
        wrapper: withStore(loadingMockProductsState),
      },
    );

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
          groupingProperties: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchQuery: {},
        fetchConfig: { headers: { 'X-Test-Header': 'test' } },
      };

      renderHook(() => useProductGroupingProperties(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductGroupingProperties).toHaveBeenCalledWith(
        mockProductId,
        options.fetchQuery,
        options.fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          groupingProperties: {
            error: {},
            isLoading: {},
            results: {},
          },
        },
      };

      renderHook(
        () =>
          useProductGroupingProperties(mockProductId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(initialMockProductsState),
        },
      );

      expect(fetchProductGroupingProperties).not.toHaveBeenCalled();
    });

    it('should fetch data with fetchQuery', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          groupingProperties: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchQuery: { hasStock: true },
        fetchConfig: {},
      };

      renderHook(() => useProductGroupingProperties(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductGroupingProperties).toHaveBeenCalledWith(
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
      } = renderHook(() => useProductGroupingProperties(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      refetch();

      expect(fetchProductGroupingProperties).toHaveBeenCalledWith(
        mockProductId,
        undefined,
        undefined,
      );
    });
  });
});
