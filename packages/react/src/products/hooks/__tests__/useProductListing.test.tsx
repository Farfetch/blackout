import {
  fetchProductListing,
  fetchProductSet,
  getSlug,
  resetProductListings,
} from '@farfetch/blackout-redux';
import { mockBrandResponse } from 'tests/__fixtures__/brands/index.mjs';
import { mockCategory } from 'tests/__fixtures__/categories/index.mjs';
import {
  mockProductsListDenormalizedFacetGroups,
  mockProductsListHash,
  mockProductsListHashWithoutParameters,
  mockProductsListNormalizedPayload,
  mockProductsListPathname,
  mockProductsState,
  mockQuery,
} from 'tests/__fixtures__/products/index.mjs';
import { ProductListingType } from '../types/index.js';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers/index.js';
import useProductListing from '../useProductListing.js';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchProductListing: jest.fn(() => () => Promise.resolve()),
  fetchProductSet: jest.fn(() => () => Promise.resolve()),
  resetProductListings: jest.fn(() => () => Promise.resolve()),
}));

const slug = getSlug(mockProductsListPathname);

const expectedProductsDenormalized = Object.values(
  mockProductsListNormalizedPayload.entities.products,
).map(product => ({
  ...product,
  brand: mockBrandResponse,
  categories: [mockCategory],
}));

describe('useProductListing', () => {
  beforeEach(jest.clearAllMocks);

  it('should return data correctly with initial state', () => {
    const mockState = {
      ...mockProductsState,
      products: {
        ...mockProductsState.products,
        lists: {
          error: { [mockProductsListHashWithoutParameters]: undefined },
          isHydrated: {
            [mockProductsListHashWithoutParameters]: true,
          },
          isLoading: { [mockProductsListHashWithoutParameters]: false },
          hash: mockProductsListHashWithoutParameters,
        },
      },
    };

    const { result } = renderHook(() => useProductListing(slug), {
      wrapper: withStore(mockState),
    });

    const mockList =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHashWithoutParameters
      ];

    expect(result.current).toStrictEqual({
      error: undefined,
      isFetched: true,
      isLoading: false,
      data: {
        ...mockList,
        facetGroups:
          mockProductsListDenormalizedFacetGroups[
            mockProductsListHashWithoutParameters
          ],
        items: expectedProductsDenormalized,
        hash: mockProductsListHashWithoutParameters,
        pagination: {
          number: mockList.products.number,
          pageSize: mockList.config.pageSize,
          totalItems: mockList.products.totalItems,
          totalPages: mockList.products.totalPages,
        },
      },
      actions: {
        reset: expect.any(Function),
        refetch: expect.any(Function),
      },
    });

    expect(fetchProductListing).not.toHaveBeenCalled();
  });

  it('should return error state', () => {
    const mockError = new Error('Error - Not loaded.') as BlackoutError;

    const errorMockProductsState = {
      entities: {},
      products: {
        ...mockProductsState.products,
        lists: {
          error: {
            [mockProductsListHashWithoutParameters]: mockError,
          },
          isHydrated: {
            [mockProductsListHashWithoutParameters]: false,
          },
          isLoading: {
            [mockProductsListHashWithoutParameters]: false,
          },
          hash: mockProductsListHashWithoutParameters,
        },
      },
    };

    const { result } = renderHook(() => useProductListing(slug), {
      wrapper: withStore(errorMockProductsState),
    });

    expect(result.current).toStrictEqual({
      error: mockError,
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
        ...mockProductsState.products,
        lists: {
          error: {},
          isHydrated: {},
          isLoading: {
            [mockProductsListHashWithoutParameters]: true,
          },
          hash: mockProductsListHashWithoutParameters,
        },
      },
    };

    const { result } = renderHook(() => useProductListing(slug), {
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
    it('should not fetch data if `enableAutoFetch` option is false', () => {
      const slug = getSlug('shopping/men/clothing');

      const { result } = renderHook(
        () => useProductListing(slug, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      expect(fetchProductListing).not.toHaveBeenCalled();
      expect(result.current).toStrictEqual({
        error: undefined,
        isFetched: false,
        isLoading: undefined,
        data: undefined,
        actions: {
          reset: expect.any(Function),
          refetch: expect.any(Function),
        },
      });
    });

    it('should fetch data if `enableAutoFetch` is true and there is no loaded data', () => {
      const slug = getSlug('shopping/men/clothing');

      renderHook(() => useProductListing(slug), {
        wrapper: withStore(mockProductsState),
      });

      expect(fetchProductListing).toHaveBeenCalled();
    });

    it('should return data correctly when `query` option is passed', () => {
      const { result } = renderHook(
        () => useProductListing(slug, { query: mockQuery }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      const mockList =
        mockProductsListNormalizedPayload.entities.productsLists[
          mockProductsListHash
        ];

      expect(result.current).toStrictEqual({
        error: undefined,
        isFetched: true,
        isLoading: false,
        data: {
          ...mockList,
          facetGroups:
            mockProductsListDenormalizedFacetGroups[mockProductsListHash],
          hash: mockProductsListHash,
          items: expectedProductsDenormalized,
          pagination: {
            number: mockList.products.number,
            pageSize: mockList.config.pageSize,
            totalItems: mockList.products.totalItems,
            totalPages: mockList.products.totalPages,
          },
        },
        actions: {
          reset: expect.any(Function),
          refetch: expect.any(Function),
        },
      });
    });
  });

  describe('actions', () => {
    it('should call `reset` action successfully', () => {
      const {
        result: {
          current: {
            data,
            actions: { reset },
          },
        },
      } = renderHook(() => useProductListing(slug, { query: mockQuery }), {
        wrapper: withStore(mockProductsState),
      });

      reset();

      expect(resetProductListings).toHaveBeenCalledWith([data?.hash]);
    });

    it('should call `fetchListing` successfully when `refetch` action is called and type is `listing`', () => {
      const {
        result: {
          current: {
            actions: { refetch },
          },
        },
      } = renderHook(
        () =>
          useProductListing(slug, {
            query: mockQuery,
            useCache: false,
            setProductsListHash: true,
          }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      refetch();

      expect(fetchProductListing).toHaveBeenCalledWith(
        slug,
        mockQuery,
        { setProductsListHash: true, useCache: false },
        undefined,
      );
    });

    it('should call `fetchSet` successfully when `refetch` action is called and type is `set`', () => {
      const {
        result: {
          current: {
            actions: { refetch },
          },
        },
      } = renderHook(
        () =>
          useProductListing(slug, {
            query: mockQuery,
            useCache: false,
            type: ProductListingType.Set,
          }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      refetch();

      expect(fetchProductSet).toHaveBeenCalledWith(
        slug,
        mockQuery,
        { setProductsListHash: undefined, useCache: false },
        undefined,
      );
    });
  });
});
