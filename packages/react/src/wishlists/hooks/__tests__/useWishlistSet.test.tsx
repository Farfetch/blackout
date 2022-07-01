import { cleanup, renderHook } from '@testing-library/react';
import { mockStore } from '../../../../tests/helpers';
import {
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlistSet from '../useWishlistSet';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  removeWishlistSet: jest.fn(() => ({ type: 'remove' })),
  updateWishlistSet: jest.fn(() => ({ type: 'update' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockWishlistState) => {
  const {
    result: { current },
  } = renderHook(() => useWishlistSet(mockWishlistSetId), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useWishlistSet', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      removeWishlistSet: expect.any(Function),
      error: expect.any(Object),
      isFetched: expect.any(Boolean),
      isLoading: expect.any(Boolean),
      itemsCounter: expect.any(Number),
      totalQuantity: expect.any(Number),
      updateWishlistSet: expect.any(Function),
      wishlistSet: expect.any(Object),
    });
  });

  it('should render in error state', () => {
    const mockError = { message: 'This is an error message' };
    const { error } = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist,
        sets: {
          ...mockWishlistState.wishlist.sets,
          set: {
            ...mockWishlistState.wishlist.sets.set,
            error: {
              [mockWishlistSetId]: mockError,
            },
          },
        },
      },
    });

    expect(error).toEqual(mockError);
  });

  describe('actions', () => {
    it('should call `removeWishlistSet` action', () => {
      const { removeWishlistSet } = getRenderedHook();

      removeWishlistSet(mockWishlistSetId);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'remove' });
    });

    it('should call `updateWishlistSet` action', () => {
      const { updateWishlistSet } = getRenderedHook();

      updateWishlistSet(mockWishlistSetId, mockWishlistSetPatchData);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });
  });
});
