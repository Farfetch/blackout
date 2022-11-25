import {
  fetchRecentlyViewedProducts,
  removeRecentlyViewedProduct,
  saveRecentlyViewedProduct,
} from '@farfetch/blackout-redux';
import { mockBrandResponse } from 'tests/__fixtures__/brands';
import { mockCategory } from 'tests/__fixtures__/categories';
import {
  mockProductId,
  mockProductsListHash,
  mockProductsListHashWithProductIds,
  mockProductsListHashWithSingleProductId,
  mockProductsListNormalizedPayload,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useRecentlyViewedProduct from '../useRecentlyViewedProducts';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchRecentlyViewedProducts: jest.fn(() => () => Promise.resolve()),
  removeRecentlyViewedProduct: jest.fn(() => () => Promise.resolve()),
  saveRecentlyViewedProduct: jest.fn(() => () => () => Promise.resolve()),
  fetchProductListing: jest.fn(() => () => Promise.resolve()),
  fetchProductSet: jest.fn(() => () => Promise.resolve()),
}));

const expectedProductsDenormalized = Object.values(
  mockProductsListNormalizedPayload.entities.products,
).map(product => ({
  ...product,
  brand: mockBrandResponse,
  categories: [mockCategory],
}));

describe('useRecentlyViewedProducts', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const mockState = {
      ...mockProductsState,
      products: {
        ...mockProductsState.products,
        lists: {
          error: {},
          isHydrated: {},
          isLoading: { [mockProductsListHashWithProductIds]: false },
          hash: null,
        },
      },
      entities: {
        ...mockProductsState.entities,
        productsLists: {
          [mockProductsListHashWithProductIds]: {
            ...mockProductsState.entities.productsLists[mockProductsListHash],
            hash: mockProductsListHashWithProductIds,
            products: {
              entries: [12913172, 12913174],
              number: 1,
              totalItems: 2,
              totalPages: 1,
            },
            config: {
              ...mockProductsState.entities.productsLists[mockProductsListHash]
                .config,
              pageIndex: 1,
              pageSize: 9,
              mobilePageSize: 9,
            },
          },
        },
      },
    };

    const { result } = renderHook(() => useRecentlyViewedProduct(), {
      wrapper: withStore(mockState),
    });

    expect(result.current).toStrictEqual({
      error: undefined,
      isFetched: true,
      isLoading: false,
      data: {
        number: 1,
        totalPages: 1,
        totalItems: 2,
        products: expectedProductsDenormalized,
      },
      actions: {
        fetch: expect.any(Function),
        remove: expect.any(Function),
        save: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const mockError = new Error('This is an error message') as BlackoutError;

    const errorMockRecentlyViewedState = {
      entities: {},
      products: {
        ...mockProductsState.products,
        lists: {
          error: {},
          isHydrated: {},
          isLoading: {},
          hash: null,
        },
        recentlyViewed: {
          error: mockError,
          isLoading: false,
          result: null,
        },
      },
    };

    const { result } = renderHook(() => useRecentlyViewedProduct(), {
      wrapper: withStore(errorMockRecentlyViewedState),
    });

    expect(result.current).toStrictEqual({
      error: mockError,
      isFetched: true,
      isLoading: false,
      data: {
        products: undefined,
      },
      actions: {
        fetch: expect.any(Function),
        remove: expect.any(Function),
        save: expect.any(Function),
      },
    });
  });

  it('should return loading state', () => {
    const loadingMockRecentlyViewedState = {
      entities: {},
      products: {
        ...mockProductsState.products,
        lists: {
          error: {},
          isHydrated: {},
          isLoading: {},
          hash: null,
        },
        recentlyViewed: {
          error: null,
          isLoading: true,
          result: null,
        },
      },
    };

    const { result } = renderHook(() => useRecentlyViewedProduct(), {
      wrapper: withStore(loadingMockRecentlyViewedState),
    });

    expect(result.current).toStrictEqual({
      error: undefined,
      isFetched: false,
      isLoading: true,
      data: {
        products: undefined,
      },
      actions: {
        fetch: expect.any(Function),
        remove: expect.any(Function),
        save: expect.any(Function),
      },
    });
  });

  describe('options', () => {
    it('should not fetch data if `enableAutoFetch` option is false', () => {
      const mockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          recentlyViewed: {
            error: null,
            isLoading: false,
            result: null,
          },
        },
      };

      renderHook(
        () =>
          useRecentlyViewedProduct({
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockState),
        },
      );

      expect(fetchRecentlyViewedProducts).not.toHaveBeenCalled();
    });

    it('should fetch data if `enableAutoFetch` is true and there is no loaded data ', () => {
      const mockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          recentlyViewed: {
            error: null,
            isLoading: false,
            result: null,
          },
        },
      };

      renderHook(() => useRecentlyViewedProduct(), {
        wrapper: withStore(mockState),
      });

      expect(fetchRecentlyViewedProducts).toHaveBeenCalled();
    });

    it('should not return the product passed on `excludeProductId` param', () => {
      const mockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          lists: {
            error: {},
            isHydrated: {},
            isLoading: {
              [mockProductsListHashWithProductIds]: false,
              [mockProductsListHashWithSingleProductId]: false,
            },
            hash: null,
          },
        },
        entities: {
          ...mockProductsState.entities,
          productsLists: {
            [mockProductsListHashWithSingleProductId]: {
              ...mockProductsState.entities.productsLists[mockProductsListHash],
              hash: mockProductsListHashWithSingleProductId,
              products: {
                entries: [12913172],
                number: 1,
                totalItems: 1,
                totalPages: 1,
              },
              config: {
                ...mockProductsState.entities.productsLists[
                  mockProductsListHash
                ].config,
                pageIndex: 1,
                pageSize: 9,
                mobilePageSize: 9,
              },
            },
            [mockProductsListHashWithProductIds]: {
              ...mockProductsState.entities.productsLists[mockProductsListHash],
              hash: mockProductsListHashWithProductIds,
              products: {
                entries: [12913172, 12913174],
                number: 1,
                totalItems: 2,
                totalPages: 1,
              },
              config: {
                ...mockProductsState.entities.productsLists[
                  mockProductsListHash
                ].config,
                pageIndex: 1,
                pageSize: 9,
                mobilePageSize: 9,
              },
            },
          },
        },
      };

      const { result } = renderHook(
        () => useRecentlyViewedProduct({ excludeProductId: 12913174 }),
        {
          wrapper: withStore(mockState),
        },
      );

      expect(
        result.current.data.products?.find(product => product.id === 12913174),
      ).toBeUndefined();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action successfully', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useRecentlyViewedProduct(), {
        wrapper: withStore(mockProductsState),
      });

      fetch();

      expect(fetchRecentlyViewedProducts).toHaveBeenCalled();
    });

    it('should call `remove` action successfully', () => {
      const {
        result: {
          current: {
            actions: { remove },
          },
        },
      } = renderHook(() => useRecentlyViewedProduct(), {
        wrapper: withStore(mockProductsState),
      });

      remove(mockProductId);

      expect(removeRecentlyViewedProduct).toHaveBeenCalledWith(mockProductId);
    });

    it('should call `save` action successfully', () => {
      const {
        result: {
          current: {
            actions: { save },
          },
        },
      } = renderHook(() => useRecentlyViewedProduct(), {
        wrapper: withStore(mockProductsState),
      });

      save(mockProductId);

      expect(saveRecentlyViewedProduct).toHaveBeenCalledWith(mockProductId);
    });
  });
});
