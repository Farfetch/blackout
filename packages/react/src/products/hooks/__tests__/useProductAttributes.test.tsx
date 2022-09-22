import { fetchProductAttributes } from '@farfetch/blackout-redux';
import {
  mockProductAttributes,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductAttributes from '../useProductAttributes';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductAttributes: jest.fn(() => () => Promise.resolve()),
}));

describe('useProductAttributes', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const { result } = renderHook(() => useProductAttributes(mockProductId), {
      wrapper: withStore(mockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: null,
      isFetched: true,
      isLoading: false,
      data: mockProductAttributes,
      actions: {
        refetch: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        attributes: {
          error: {
            [mockProductId]: 'Error - Not loaded.',
          },
          isLoading: {
            [mockProductId]: false,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductAttributes(mockProductId), {
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
        attributes: {
          error: {},
          isLoading: {
            [mockProductId]: true,
          },
        },
      },
    };

    const { result } = renderHook(() => useProductAttributes(mockProductId), {
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
          attributes: {
            error: {},
            isLoading: {},
          },
        },
      };

      const options = {
        fetchConfig: { headers: { 'X-Test-Header': 'test' } },
      };

      renderHook(() => useProductAttributes(mockProductId, options), {
        wrapper: withStore(initialMockProductsState),
      });

      expect(fetchProductAttributes).toHaveBeenCalledWith(
        mockProductId,
        options.fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => useProductAttributes(mockProductId, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      expect(fetchProductAttributes).not.toHaveBeenCalled();
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
      } = renderHook(() => useProductAttributes(mockProductId), {
        wrapper: withStore(mockProductsState),
      });

      refetch();

      expect(fetchProductAttributes).toHaveBeenCalledWith(
        mockProductId,
        undefined,
      );
    });
  });
});