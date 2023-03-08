import { cleanup, renderHook } from '@testing-library/react';
import {
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/index.mjs';
import {
  removeWishlistItem,
  updateWishlistItem,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers/index.js';
import useWishlistItem from '../useWishlistItem.js';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  removeWishlistItem: jest.fn(() => ({ type: 'remove' })),
  updateWishlistItem: jest.fn(() => ({ type: 'update' })),
}));

describe('useWishlistItem', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useWishlistItem(mockWishlistItemId), {
      wrapper: withStore(mockWishlistState),
    });

    expect(current).toStrictEqual({
      error: expect.any(Object),
      isLoading: expect.any(Boolean),
      isFetched: expect.any(Boolean),
      actions: {
        update: expect.any(Function),
        remove: expect.any(Function),
      },
      data: {
        ...mockWishlistState.entities?.wishlistItems?.[mockWishlistItemId],
        product: {
          ...mockWishlistState.entities!.products![
            mockWishlistState.entities!.wishlistItems![mockWishlistItemId]!
              .product
          ],
          brand: mockWishlistState.entities?.brands?.[2450],
          categories: [mockWishlistState.entities?.categories?.[136301]],
        },
      },
    });
  });

  it('should render in error state', () => {
    const mockError = new Error('This is an error message') as BlackoutError;

    const {
      result: {
        current: { error },
      },
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

    expect(error).toEqual(mockError);
  });

  describe('actions', () => {
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
  });
});
