import { cleanup, renderHook } from '@testing-library/react';
import {
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import {
  removeWishlistItem,
  updateWishlistItem,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers';
import useWishlistItem from '../useWishlistItem';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  removeWishlistItem: jest.fn(() => ({ type: 'remove' })),
  updateWishlistItem: jest.fn(() => ({ type: 'update' })),
}));

const defaultReturn = {
  error: undefined,
  isLoading: false,
  isFetched: true,
  actions: {
    update: expect.any(Function),
    remove: expect.any(Function),
  },
  data: {
    ...mockWishlistState.entities?.wishlistItems?.[mockWishlistItemId],
    product: {
      ...mockWishlistState.entities!.products![
        mockWishlistState.entities!.wishlistItems![mockWishlistItemId]!.product
      ],
      brand: mockWishlistState.entities?.brands?.[2450],
      categories: [mockWishlistState.entities?.categories?.[136301]],
    },
  },
};

describe('useWishlistItem', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useWishlistItem(mockWishlistItemId), {
      wrapper: withStore(mockWishlistState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return values correctly with an error state', () => {
    const mockError = new Error('This is an error message') as BlackoutError;

    const {
      result: { current },
    } = renderHook(() => useWishlistItem(mockWishlistItemId), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState.wishlist!.items,
            item: {
              ...mockWishlistState.wishlist!.items.item,
              error: {
                [mockWishlistItemId]: mockError,
              },
            },
          },
        },
      }),
    });

    expect(current).toEqual({
      ...defaultReturn,
      error: mockError,
      isFetched: true,
    });
  });

  it('should return values correctly with a loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useWishlistItem(mockWishlistItemId), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState.wishlist!.items,
            item: {
              ...mockWishlistState.wishlist!.items.item,
              isLoading: {
                [mockWishlistItemId]: true,
              },
            },
          },
        },
      }),
    });

    expect(current).toEqual({
      ...defaultReturn,
      isLoading: true,
      isFetched: false,
    });
  });

  describe('actions', () => {
    describe('remove', () => {
      it('should call `removeWishlistItem` action', () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(() => useWishlistItem(mockWishlistItemId), {
          wrapper: withStore(mockWishlistState),
        });

        remove();

        expect(removeWishlistItem).toHaveBeenCalledWith(
          mockWishlistItemId,
          undefined,
        );
      });

      it('should throw an error if no wishlist item id is passed', () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
          /** @ts-expect-error Do not pass wishlist item id for test */
        } = renderHook(() => useWishlistItem(), {
          wrapper: withStore(mockWishlistState),
        });

        return expect(remove()).rejects.toThrow(
          'No wishlist item id was specified',
        );
      });
    });

    describe('update', () => {
      it('should call `updateWishlistItem` action', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useWishlistItem(mockWishlistItemId), {
          wrapper: withStore(mockWishlistState),
        });

        update(mockWishlistItemPatchData);

        expect(updateWishlistItem).toHaveBeenCalledWith(
          mockWishlistItemId,
          mockWishlistItemPatchData,
          undefined,
        );
      });

      it('should throw an error if no wishlist item id is passed', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
          /** @ts-expect-error Do not pass wishlist item id for test */
        } = renderHook(() => useWishlistItem(), {
          wrapper: withStore(mockWishlistState),
        });

        return expect(update(mockWishlistItemPatchData)).rejects.toThrow(
          'No wishlist item id was specified',
        );
      });
    });
  });
});
