import { cleanup, renderHook } from '@testing-library/react';
import { mockStore } from '../../../../tests/helpers';
import {
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlistSets from '../useWishlistSets';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistSet: jest.fn(() => ({ type: 'add' })),
  fetchWishlistSets: jest.fn(() => ({ type: 'fetch' })),
  resetWishlistSets: jest.fn(() => ({ type: 'reset' })),
  resetWishlistSetsState: jest.fn(() => ({ type: 'resetState' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockWishlistState) => {
  const {
    result: { current },
  } = renderHook(() => useWishlistSets(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useWishlistSets', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      addWishlistSet: expect.any(Function),
      allWishlistSetsErrors: expect.any(Array),
      areLoading: expect.any(Boolean),
      error: undefined,
      fetchWishlistSets: expect.any(Function),
      isAnyWishlistSetLoading: expect.any(Boolean),
      isAnyWishlistSetWithError: expect.any(Boolean),
      resetWishlistSets: expect.any(Function),
      resetWishlistSetsState: expect.any(Function),
      wishlistSets: expect.any(Array),
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
          error: mockError,
        },
      },
    });

    expect(error).toEqual(mockError);
  });

  it('should render with any set in error state', () => {
    const mockError = { message: 'This is an error message' };
    const { allWishlistSetsErrors } = getRenderedHook({
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

    expect(allWishlistSetsErrors).toEqual([
      {
        error: mockError,
        id: mockWishlistSetId,
        name: mockWishlistState.entities.wishlistSets[mockWishlistSetId].name,
      },
    ]);
  });

  describe('actions', () => {
    it('should call `addWishlistSet` action', () => {
      const { addWishlistSet } = getRenderedHook();

      addWishlistSet({ name: 'test' });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });

    it('should call `fetchWishlistSets` action', () => {
      const { fetchWishlistSets } = getRenderedHook();

      fetchWishlistSets();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should call `resetWishlistSets` action', () => {
      const { resetWishlistSets } = getRenderedHook();

      resetWishlistSets();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });

    it('should call `resetWishlistSetsState` action', () => {
      const { resetWishlistSetsState } = getRenderedHook();

      resetWishlistSetsState(['error']);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'resetState' });
    });
  });
});
