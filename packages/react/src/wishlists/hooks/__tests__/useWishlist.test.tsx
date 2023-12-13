import {
  addWishlistItem,
  fetchWishlist,
  removeWishlistItem,
  resetWishlist,
  type StoreState,
  updateWishlistItem,
  type WishlistNormalized,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import { cloneDeep } from 'lodash-es';
import {
  mockUserInitialState,
  mockUsersResponse,
} from 'tests/__fixtures__/users/index.mjs';
import {
  mockWishlistId,
  mockWishlistInitialStateWithoutUser,
  mockWishlistItemId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useWishlist from '../useWishlist.js';

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

const mockInitialState = {
  entities: {
    user: mockUserState.entities.user,
  },
  wishlist: {
    error: null,
    id: null,
    isLoading: false,
    result: null,
    items: {
      ids: null,
      item: {
        error: {},
        isLoading: {},
      },
    },
    sets: {
      error: null,
      ids: null,
      isLoading: false,
      set: {
        error: {},
        isLoading: {},
      },
    },
  },
};

const mockError = toBlackoutError(new Error('This is an error message'));

const mockErrorState = {
  ...mockInitialState,
  wishlist: {
    ...mockInitialState.wishlist,
    error: mockError,
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistItem: jest.fn(() => () => Promise.resolve()),
  updateWishlistItem: jest.fn(() => () => Promise.resolve()),
  fetchWishlist: jest.fn(() => () => Promise.resolve()),
  resetWishlist: jest.fn(() => () => Promise.resolve()),
  removeWishlistItem: jest.fn(() => () => Promise.resolve()),
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

  it('should return correctly with an error state', () => {
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useWishlist(), {
      wrapper: withStore(mockErrorState),
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

  it('should return correctly with a loading state', () => {
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
    describe('enableAutoFetch', () => {
      it('should call `fetch` action if `enableAutoFetch` option is true and user is set', () => {
        renderHook(() => useWishlist(), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchWishlist).toHaveBeenCalledWith(mockWishlistId, undefined);
      });

      it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
        renderHook(() => useWishlist({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchWishlist).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is no user set', () => {
        renderHook(() => useWishlist(), {
          wrapper: withStore({
            ...mockInitialState,
            entities: {
              ...mockInitialState.entities,
              user: undefined,
            },
          }),
        });

        expect(fetchWishlist).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is data', () => {
        renderHook(() => useWishlist(), {
          wrapper: withStore(stateMockData),
        });

        expect(fetchWishlist).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is an error', () => {
        renderHook(() => useWishlist(), {
          wrapper: withStore(mockErrorState),
        });

        expect(fetchWishlist).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchWishlist` action when user is set', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useWishlist({ enableAutoFetch: false }), {
          wrapper: withStore(stateMockData),
        });

        fetch();

        expect(fetchWishlist).toHaveBeenCalledWith(mockWishlistId, undefined);
      });

      it('should throw an error when user is not set', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useWishlist({ enableAutoFetch: false }), {
          wrapper: withStore({
            ...mockInitialState,
            entities: {
              ...mockInitialState.entities,
              user: undefined,
            },
          }),
        });

        return expect(fetch()).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );
      });
    });

    describe('addItem', () => {
      it('should call `addWishlistItem` action when user is set', async () => {
        const {
          result: {
            current: {
              actions: { addItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(stateMockData),
        });

        await addItem(
          { productId: 123, quantity: 1, size: 17 },
          { from: 'Pdp' },
        );

        expect(addWishlistItem).toHaveBeenCalledWith(
          stateMockData.entities?.user?.wishlistId,
          {
            productId: 123,
            quantity: 1,
            size: 17,
          },
          { from: 'Pdp' },
          undefined,
        );
      });

      it("should use the updated user wishlist id from the store when the user wishlist id reference on the hook wasn't updated yet", async () => {
        const mockStateWihUpdatedWishlistId = cloneDeep(stateMockData);
        const newUserWishlistId = '1234567890';

        const {
          result: {
            current: {
              actions: { addItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(mockStateWihUpdatedWishlistId),
        });

        if (mockStateWihUpdatedWishlistId.entities?.user?.wishlistId) {
          mockStateWihUpdatedWishlistId.entities.user.wishlistId =
            newUserWishlistId;
        }

        await addItem(
          { productId: 123, quantity: 1, size: 17 },
          { from: 'Pdp' },
        );

        expect(addWishlistItem).toHaveBeenCalledTimes(1);
        expect(addWishlistItem).toHaveBeenCalledWith(
          newUserWishlistId,
          {
            productId: 123,
            quantity: 1,
            size: 17,
          },
          { from: 'Pdp' },
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          result: {
            current: {
              actions: { addItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(mockWishlistInitialStateWithoutUser),
        });

        await expect(() =>
          addItem({ productId: 123, quantity: 1, size: 17 }, { from: 'Pdp' }),
        ).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(addWishlistItem).not.toHaveBeenCalled();
      });
    });

    describe('updateItem', () => {
      it('should call `updateWishlistItem` action when user is set', () => {
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

        expect(updateWishlistItem).toHaveBeenCalledWith(
          stateMockData.entities?.user?.wishlistId,
          123,
          {
            quantity: 1,
            size: 17,
            merchantId: 456,
            productId: 123,
          },
          undefined,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          result: {
            current: {
              actions: { updateItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(mockWishlistInitialStateWithoutUser),
        });

        await expect(() =>
          updateItem(123, {
            quantity: 1,
            size: 17,
            merchantId: 456,
            productId: 123,
          }),
        ).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(updateWishlistItem).not.toHaveBeenCalled();
      });
    });

    describe('removeItem', () => {
      it('should call `removeWishlistItem` action when user is set', () => {
        const {
          result: {
            current: {
              actions: { removeItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(stateMockData),
        });

        removeItem(123);

        expect(removeWishlistItem).toHaveBeenCalledWith(
          stateMockData.entities?.user?.wishlistId,
          123,
          undefined,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          result: {
            current: {
              actions: { removeItem },
            },
          },
        } = renderHook(() => useWishlist(), {
          wrapper: withStore(mockWishlistInitialStateWithoutUser),
        });

        await expect(() => removeItem(123)).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(removeWishlistItem).not.toHaveBeenCalled();
      });
    });

    describe('reset', () => {
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
});
