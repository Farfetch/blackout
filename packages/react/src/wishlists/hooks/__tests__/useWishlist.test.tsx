import { cleanup, renderHook } from '@testing-library/react';
import { mockStore } from '../../../../tests/helpers';
import {
  mockWishlistId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { Provider } from 'react-redux';
import React, { FC, ReactElement } from 'react';
import useWishlist from '../useWishlist';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistItem: jest.fn(() => ({ type: 'add-item' })),
  updateWishlistItem: jest.fn(() => ({ type: 'update-item' })),
  fetchWishlist: jest.fn(() => ({ type: 'fetch' })),
  resetWishlist: jest.fn(() => ({ type: 'reset' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const withStore =
  (state = mockWishlistState): FC<{ children: ReactElement }> =>
  (props): ReactElement => {
    return <Provider store={mockStore(state)} {...props} />;
  };

describe('useWishlist', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore(),
    });

    expect(current).toStrictEqual({
      error: undefined,
      isLoading: false,
      isFetched: true,
      data: {
        count: 4,
        isEmpty: false,
        items: expect.any(Array),
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

  it('should render in error state', () => {
    const mockError = { message: 'This is an error message' };

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          error: mockError,
        },
      }),
    });

    expect(error).toEqual(mockError);
  });

  it('should render as empty', () => {
    const {
      result: {
        current: {
          isFetched,
          data: { isEmpty },
        },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          result: {
            ...mockWishlistState.wishlist.result,
            count: 0,
            items: [],
          },
          items: {
            ...mockWishlistState.wishlist.items,
            ids: [],
          },
        },
      }),
    });

    expect(isEmpty).toBe(true);
    expect(isFetched).toBe(true);
  });

  it('should render in loading state due to the loading status', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          isLoading: true,
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          error: undefined,
          result: {},
        },
      }),
    });

    expect(isLoading).toBe(false);
  });

  describe('actions', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useWishlist({ enableAutoFetch: true }), {
        wrapper: withStore(),
      });

      fetch('123');

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(),
      });

      fetch('123');

      expect(mockDispatch).not.toHaveBeenCalledWith();
    });

    it('should call `addWishlistItem` action', () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(),
      });

      addItem({ productId: 123, quantity: 1, size: 17, from: 'PDP' });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add-item' });
    });

    it('should call `updateWishlistItem` action', () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(),
      });

      updateItem(123, {
        quantity: 1,
        size: 17,
        merchantId: 123,
        productId: 123,
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update-item' });
    });

    it('should call `resetWishlist` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useWishlist(), {
        wrapper: withStore(),
      });

      reset();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });
  });
});
