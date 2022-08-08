import {
  fetchListing,
  fetchSet,
  getSlug,
  resetProductsLists,
} from '@farfetch/blackout-redux';
import {
  mockProductsListHash,
  mockProductsListHashWithoutParameters,
  mockProductsListNormalizedPayload,
  mockProductsListPathname,
  mockProductsState,
  mockQuery,
} from 'tests/__fixtures__/products';
import { ProductListingTypes } from '../types';
import { renderHook } from '@testing-library/react';
import { withStore } from '../../../../tests/helpers';
import useProductListing from '../useProductListing';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchListing: jest.fn(() => () => Promise.resolve()),
  fetchSet: jest.fn(() => () => Promise.resolve()),
  resetProductsLists: jest.fn(() => () => Promise.resolve()),
}));

const slug = getSlug(mockProductsListPathname);

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
        items: Object.values(
          mockProductsListNormalizedPayload.entities.products,
        ),
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

    expect(fetchListing).not.toHaveBeenCalled();
  });

  it('should return error state', () => {
    const errorMockProductsState = {
      entities: {},
      products: {
        lists: {
          error: {
            [mockProductsListHashWithoutParameters]: 'Error - Not loaded.',
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

      expect(fetchListing).not.toHaveBeenCalled();
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

    it('should fetch data if `enableAutoFetch` is true and there is no loaded data ', () => {
      const slug = getSlug('shopping/men/clothing');

      renderHook(() => useProductListing(slug), {
        wrapper: withStore(mockProductsState),
      });

      expect(fetchListing).toHaveBeenCalled();
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
          items: Object.values(
            mockProductsListNormalizedPayload.entities.products,
          ),
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
            actions: { reset },
          },
        },
      } = renderHook(() => useProductListing(slug, { query: mockQuery }), {
        wrapper: withStore(mockProductsState),
      });

      reset();

      expect(resetProductsLists).toHaveBeenCalled();
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

      expect(fetchListing).toHaveBeenCalledWith(
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
            type: ProductListingTypes.Set,
          }),
        {
          wrapper: withStore(mockProductsState),
        },
      );

      refetch();

      expect(fetchSet).toHaveBeenCalledWith(
        slug,
        mockQuery,
        { setProductsListHash: undefined, useCache: false },
        undefined,
      );
    });
  });
});
