import { cleanup, renderHook } from '@testing-library/react';
import { mockStore } from '../../../../tests/helpers';
import { mockWishlistState } from 'tests/__fixtures__/wishlists';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlist from '../useWishlist';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistItem: jest.fn(() => ({ type: 'addItem' })),
  fetchWishlist: jest.fn(() => ({ type: 'fetch' })),
  resetWishlist: jest.fn(() => ({ type: 'reset' })),
  resetWishlistState: jest.fn(() => ({ type: 'resetState' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockWishlistState) => {
  const {
    result: { current },
  } = renderHook(() => useWishlist(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useWishlist', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      addWishlistItem: expect.any(Function),
      error: undefined,
      fetchWishlist: expect.any(Function),
      id: expect.any(String),
      isEmpty: expect.any(Boolean),
      isLoading: expect.any(Boolean),
      itemCount: expect.any(Number),
      items: expect.any(Array),
      itemsWithSetsInfo: expect.any(Array),
      resetWishlist: expect.any(Function),
      resetWishlistState: expect.any(Function),
      totalQuantity: expect.any(Number),
      wishlist: expect.any(Object),
    });
  });

  it('should render in error state', () => {
    const mockError = { message: 'This is an error message' };
    const { error } = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist,
        error: mockError,
      },
    });

    expect(error).toEqual(mockError);
  });

  it('should render as empty', () => {
    const { isEmpty } = getRenderedHook({
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
    });

    expect(isEmpty).toBe(true);
  });

  it('should render in loading state due to the loading status', () => {
    const { isLoading } = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist,
        isLoading: true,
      },
    });

    expect(isLoading).toBe(true);
  });

  it("should render in loading state while it doesn't begin fetching", () => {
    const { isLoading } = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist,
        error: null,
        result: undefined,
      },
    });

    expect(isLoading).toBe(true);
  });

  describe('actions', () => {
    it('should call `addWishlistItem` action', () => {
      const { addWishlistItem } = getRenderedHook();

      addWishlistItem();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'addItem' });
    });

    it('should call `fetchWishlist` action', () => {
      const { fetchWishlist } = getRenderedHook();

      fetchWishlist();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should call `resetWishlist` action', () => {
      const { resetWishlist } = getRenderedHook();

      resetWishlist();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });

    it('should call `resetWishlistState` action', () => {
      const { resetWishlistState } = getRenderedHook();

      resetWishlistState(['error']);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'resetState' });
    });
  });
});
