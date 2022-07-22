import { cleanup, renderHook } from '@testing-library/react';
import { mockStore } from '../../../../tests/helpers';
import {
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { Provider } from 'react-redux';
import React from 'react';
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

const getRenderedHook = (state = mockWishlistState) => {
  const {
    result: { current },
  } = renderHook(() => useWishlistItem(mockWishlistItemId), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useWishlistItem', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      error: expect.any(Object),
      isLoading: expect.any(Boolean),
      isFetched: expect.any(Boolean),
      actions: {
        update: expect.any(Function),
        remove: expect.any(Function),
      },
      data: expect.any(Object),
    });
  });

  it('should render in error state', () => {
    const mockError = { message: 'This is an error message' };
    const { error } = getRenderedHook({
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
    });

    expect(error).toEqual(mockError);
  });

  describe('actions', () => {
    it('should call `removeWishlistItem` action', () => {
      const {
        actions: { remove },
      } = getRenderedHook();

      remove();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'remove' });
    });

    it('should call `updateWishlistItem` action', () => {
      const {
        actions: { update },
      } = getRenderedHook();

      update(mockWishlistItemPatchData);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });
  });
});
