import {
  fetchProductDetails,
  resetProductDetails,
} from '@farfetch/blackout-redux';
import {
  mockProduct,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductDetails from '../useProductDetails';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductDetails: jest.fn(() => () => Promise.resolve()),
  resetProductDetails: jest.fn(() => () => Promise.resolve()),
}));

describe('useProductDetails', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const { result } = renderHook(() => useProductDetails(mockProductId), {
      wrapper: withStore(mockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: null,
      isFetched: true,
      isLoading: false,
      data: {
        ...mockProduct,
        isOneSize: false,
        isOutOfStock: false,
      },
      actions: {
        reset: expect.any(Function),
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        details: {
          error: {
            [mockProductId]: 'Error - Not loaded.',
          },
          isHydrated: {
            [mockProductId]: false,
          },
          isLoading: {
            [mockProductId]: false,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductDetails(mockProductId), {
      wrapper: withStore(errorMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: 'Error - Not loaded.',
      isFetched: true,
      isLoading: false,
      data: undefined,
      actions: {
        reset: expect.any(Function),
        refetch: expect.any(Function),
      },
    });
  });

  it('should return loading state', () => {
    const loadingMockProductsState = {
      entities: {},
      products: {
        details: {
          error: {},
          isHydrated: {},
          isLoading: {
            [mockProductId]: true,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductDetails(mockProductId), {
      wrapper: withStore(loadingMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: undefined,
      isFetched: false,
      isLoading: true,
      data: undefined,
      actions: {
        reset: expect.any(Function),
        refetch: expect.any(Function),
      },
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true', () => {
      const initialMockProductsState = {
        entities: {},
        products: {
          details: {
            error: {},
            isHydrated: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchQuery: { merchantId: 123 },
        fetchConfig: { headers: { 'X-Test-Header': 'test' } },
      };

      renderHook(() => useProductDetails(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductDetails).toHaveBeenCalledWith(
        mockProductId,
        options.fetchQuery,
        false,
        options.fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => useProductDetails(mockProductId, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      expect(fetchProductDetails).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `reset` action successfully', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useProductDetails(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      reset();

      expect(resetProductDetails).toHaveBeenCalledWith([mockProductId]);
    });

    it('should call `refetch` action successfully', () => {
      const {
        result: {
          current: {
            actions: { refetch },
          },
        },
      } = renderHook(() => useProductDetails(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      refetch();

      expect(fetchProductDetails).toHaveBeenCalledWith(
        mockProductId,
        undefined,
        false,
        undefined,
      );
    });
  });
});
