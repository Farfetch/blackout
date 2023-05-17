import { fetchProductAttributes } from '@farfetch/blackout-redux';
import {
  mockProductAttributes,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products/index.mjs';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers/index.js';
import useProductAttributes from '../useProductAttributes.js';
import type { BlackoutError } from '@farfetch/blackout-client';

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
      error: undefined,
      isFetched: true,
      isLoading: false,
      data: mockProductAttributes,
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
        attributes: {
          error: {
            [mockProductId]: mockError,
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
          ...mockProductsState.products,
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
