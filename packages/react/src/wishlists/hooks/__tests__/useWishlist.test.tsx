import {
  addWishlistItem,
  fetchWishlist,
  resetWishlist,
  type StoreState,
  updateWishlistItem,
  type WishlistNormalized,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import {
  mockUserInitialState,
  mockUsersResponse,
} from 'tests/__fixtures__/users/index.mjs';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { withStore } from '../../../../tests/helpers/index.js';
import useWishlist from '../useWishlist.js';
import type { BlackoutError } from '@farfetch/blackout-client';

const mockUserState = {
  entities: {
    user: {
      ...mockUsersResponse,
      id: 1234,
      wishlistId: mockWishlistId,
    },
  },
  users: {
    ...mockUserInitialState,
    error: null,
    isLoading: false,
    result: 1234,
  },
};

const stateMockData: StoreState = {
  ...mockWishlistState,
  ...mockUserState,
  entities: {
    ...mockWishlistState.entities,
    ...mockUserState.entities,
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistItem: jest.fn(() => () => Promise.resolve()),
  updateWishlistItem: jest.fn(() => () => Promise.resolve()),
  fetchWishlist: jest.fn(() => () => Promise.resolve()),
  resetWishlist: jest.fn(() => () => Promise.resolve()),
}));

describe('useWishlist', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        count: 4,
        isEmpty: false,
        items: [
          {
            ...stateMockData.entities!.wishlistItems![mockWishlistItemId],
            product: {
              ...stateMockData.entities!.products![
                stateMockData.entities!.wishlistItems![mockWishlistItemId]!
                  .product
              ],
              brand: stateMockData.entities?.brands?.[2450],
              categories: [stateMockData.entities?.categories?.[136301]],
            },
          },
          {
            ...stateMockData.entities!.wishlistItems![102],
            product: {
              ...stateMockData.entities!.products![1002],
              brand: stateMockData.entities!.brands![2450],
              categories: [stateMockData.entities!.categories![136301]],
            },
          },
        ],
        userId: null,
        id: mockWishlistId,
      },
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
        addItem: expect.any(Function),
        updateItem: expect.any(Function),
        removeItem: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const mockError = new Error('This is an error message') as BlackoutError;

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist!,
          error: mockError,
        },
      }),
    });

    expect(error).toEqual(mockError);
  });

  it('should return correctly if empty', () => {
    const {
      result: {
        current: { isFetched, data },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist!,
          result: {
            ...(stateMockData.wishlist!.result as WishlistNormalized),
            count: 0,
            items: [],
          },
          items: {
            ...stateMockData.wishlist!.items,
            ids: [],
          },
        },
      }),
    });

    const isEmpty = data?.isEmpty;

    expect(isEmpty).toBe(true);
    expect(isFetched).toBe(true);
  });

  it('should return loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist!,
          isLoading: true,
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it('should not return data as loading if data was not fetched', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist!,
          error: null,
          result: null,
        },
      }),
    });

    expect(isLoading).toBe(false);
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is true', () => {
      renderHook(() => useWishlist({ enableAutoFetch: true }), {
        wrapper: withStore(stateMockData),
      });

      expect(fetchWishlist).toHaveBeenCalledWith(mockWishlistId, undefined);
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => useWishlist(), {
        wrapper: withStore(stateMockData),
      });

      expect(fetchWishlist).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      renderHook(() => useWishlist({ enableAutoFetch: true }), {
        wrapper: withStore(stateMockData),
      });

      expect(fetchWishlist).toHaveBeenCalledWith(mockWishlistId, undefined);
    });

    it('should call `addWishlistItem` action', () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(stateMockData),
      });

      addItem({ productId: 123, quantity: 1, size: 17 }, { from: 'PDP' });

      expect(addWishlistItem).toHaveBeenCalledWith(
        {
          productId: 123,
          quantity: 1,
          size: 17,
        },
        { from: 'PDP' },
      );
    });

    it('should call `updateWishlistItem` action', () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(stateMockData),
      });

      updateItem(123, {
        quantity: 1,
        size: 17,
        merchantId: 456,
        productId: 123,
      });

      expect(updateWishlistItem).toHaveBeenCalledWith(123, {
        quantity: 1,
        size: 17,
        merchantId: 456,
        productId: 123,
      });
    });

    it('should call `resetWishlist` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(stateMockData),
      });

      reset();

      expect(resetWishlist).toHaveBeenCalled();
    });
  });
});
