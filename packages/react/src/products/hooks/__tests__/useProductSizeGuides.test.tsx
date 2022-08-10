import { fetchProductSizeGuides } from '@farfetch/blackout-redux';
import {
  mockProductId,
  mockProductSizeGuides,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductSizeGuides from '../useProductSizeGuides';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductSizeGuides: jest.fn(() => () => Promise.resolve()),
}));

describe('useProductSizeGuides', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const { result } = renderHook(() => useProductSizeGuides(mockProductId), {
      wrapper: withStore(mockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: null,
      isFetched: true,
      isLoading: false,
      data: mockProductSizeGuides,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        sizeGuides: {
          error: {
            [mockProductId]: 'Error - Not loaded.',
          },
          isLoading: {
            [mockProductId]: false,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductSizeGuides(mockProductId), {
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
        sizeGuides: {
          error: {},
          isLoading: {
            [mockProductId]: true,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductSizeGuides(mockProductId), {
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
          sizeGuides: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchConfig: { headers: { 'X-Test-Header': 'test' } },
      };

      renderHook(() => useProductSizeGuides(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductSizeGuides).toHaveBeenCalledWith(
        mockProductId,
        options.fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => useProductSizeGuides(mockProductId, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      expect(fetchProductSizeGuides).not.toHaveBeenCalled();
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
      } = renderHook(() => useProductSizeGuides(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      refetch();

      expect(fetchProductSizeGuides).toHaveBeenCalledWith(
        mockProductId,
        undefined,
      );
    });
  });
});
