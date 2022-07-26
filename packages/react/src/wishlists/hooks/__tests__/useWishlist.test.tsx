import { cleanup, renderHook } from '@testing-library/react';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { withStore } from '../../../../tests/helpers';
import useWishlist from '../useWishlist';
import type { StoreState } from '@farfetch/blackout-redux';

const mockUserState = {
  entities: {
    user: {
      id: 1234,
      wishlistId: mockWishlistId,
    },
  },
  users: {
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
  addWishlistItem: jest.fn(data => ({ type: 'add-item', ...data })),
  updateWishlistItem: jest.fn((wishlistItemId, data) => ({
    type: 'update-item',
    wishlistItemId,
    ...data,
  })),
  fetchWishlist: jest.fn(wishlistId => ({ type: 'fetch', wishlistId })),
  resetWishlist: jest.fn(() => ({ type: 'reset' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
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
            ...stateMockData.entities?.wishlistItems?.[mockWishlistItemId],
            product:
              stateMockData.entities?.products?.[
                stateMockData.entities?.wishlistItems?.[mockWishlistItemId]
                  ?.product
              ],
          },
          {
            ...stateMockData.entities?.wishlistItems?.[102],
            product: stateMockData.entities?.products?.[1002],
          },
        ],
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
    const mockError = { message: 'This is an error message' };

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist,
          error: mockError,
        },
      }),
    });

    expect(error).toEqual(mockError);
  });

  it('should return correctly if empty', () => {
    const {
      result: {
        current: {
          isFetched,
          data: { isEmpty },
        },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...stateMockData,
        wishlist: {
          ...stateMockData.wishlist,
          result: {
            ...stateMockData.wishlist.result,
            count: 0,
            items: [],
          },
          items: {
            ...stateMockData.wishlist.items,
            ids: [],
          },
        },
      }),
    });

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
          ...stateMockData.wishlist,
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
          ...stateMockData.wishlist,
          error: undefined,
          result: {},
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

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'fetch',
        wishlistId: mockWishlistId,
      });
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => useWishlist(), {
        wrapper: withStore(stateMockData),
      });

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useWishlist({ enableAutoFetch: true }), {
        wrapper: withStore(stateMockData),
      });

      fetch('123');

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'fetch',
        wishlistId: '123',
      });
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

      addItem({ productId: 123, quantity: 1, size: 17, from: 'PDP' });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'add-item',
        from: 'PDP',
        productId: 123,
        quantity: 1,
        size: 17,
      });
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

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'update-item',
        productId: 123,
        quantity: 1,
        size: 17,
        merchantId: 456,
        wishlistItemId: 123,
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

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });
  });
});
