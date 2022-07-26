import { cleanup, renderHook } from '@testing-library/react';
import {
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { withStore } from '../../../../tests/helpers';
import useWishlistItem from '../useWishlistItem';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  removeWishlistItem: jest.fn(() => ({ type: 'remove' })),
  updateWishlistItem: jest.fn(() => ({ type: 'update' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
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
        product:
          mockWishlistState.entities?.products?.[
            mockWishlistState.entities?.wishlistItems?.[mockWishlistItemId]
              ?.product
          ],
      },
    });
  });

  it('should render in error state', () => {
    const mockError = { message: 'This is an error message' };

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useWishlistItem(mockWishlistItemId), {
      wrapper: withStore({
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          items: {
            ...mockWishlistState.wishlist.items,
            item: {
              ...mockWishlistState.wishlist.items.item,
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

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'remove' });
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

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });
  });
});
