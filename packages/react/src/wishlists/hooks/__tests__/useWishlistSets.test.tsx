import {
  addWishlistSet,
  fetchWishlistSet,
  fetchWishlistSets,
  removeWishlistSet,
  resetWishlistSets,
  resetWishlistSetsState,
  updateWishlistSet,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import {
  expectedWishlistSetsDataDenormalized,
  mockWishlistInitialState,
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlistSets from '../useWishlistSets';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { UseWishlistSetsOptions } from '../types';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistSet: jest.fn(() => ({ type: 'add' })),
  fetchWishlistSets: jest.fn(() => ({ type: 'fetch' })),
  resetWishlistSets: jest.fn(() => ({ type: 'reset' })),
  resetWishlistSetsState: jest.fn(() => ({ type: 'resetState' })),
  removeWishlistSet: jest.fn(() => ({ type: 'remove' })),
  fetchWishlistSet: jest.fn(() => ({ type: 'fetch_wishlist_set' })),
  updateWishlistSet: jest.fn(() => ({ type: 'update' })),
}));

const getRenderedHook = (
  state = mockWishlistState,
  options: UseWishlistSetsOptions = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useWishlistSets(options), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

const defaultReturn = {
  allWishlistSetsErrors: undefined,
  areLoading: false,
  areFetched: true,
  error: undefined,
  isAnyWishlistSetLoading: false,
  isAnyWishlistSetWithError: false,
  data: expectedWishlistSetsDataDenormalized,
  actions: {
    add: expect.any(Function),
    reset: expect.any(Function),
    fetch: expect.any(Function),
    fetchWishlistSet: expect.any(Function),
    resetWishlistSetsState: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function),
  },
};

describe('useWishlistSets', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockWishlistInitialState);

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: undefined,
      areFetched: false,
    });
  });

  it('should return values correctly when it has data', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return values correctly when it has an error in all sets request', () => {
    const mockError = new Error('This is an error message') as BlackoutError;
    const current = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist!,
        sets: {
          ...mockWishlistState.wishlist!.sets,
          error: mockError,
        },
      },
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      error: mockError,
      isAnyWishlistSetWithError: true,
    });
  });

  it('should return values correctly when it has an error in a single set request', () => {
    const mockError = new Error('This is an error message') as BlackoutError;
    const current = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist!,
        sets: {
          ...mockWishlistState!.wishlist!.sets,
          set: {
            ...mockWishlistState!.wishlist!.sets.set,
            error: {
              [mockWishlistSetId]: mockError,
            },
          },
        },
      },
    });

    expect(current).toEqual({
      ...defaultReturn,
      allWishlistSetsErrors: [
        {
          error: mockError,
          id: mockWishlistSetId,
          name: mockWishlistState!.entities!.wishlistSets![mockWishlistSetId]!
            .name,
        },
      ],
      isAnyWishlistSetWithError: true,
    });
  });

  it('should return values correctly when it is loading all sets', () => {
    const current = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist!,
        sets: {
          ...mockWishlistState.wishlist!.sets,
          isLoading: true,
        },
      },
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      areFetched: false,
      areLoading: true,
      isAnyWishlistSetLoading: true,
    });
  });

  it('should return values correctly when it is loading a single set', () => {
    const current = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist!,
        sets: {
          ...mockWishlistState.wishlist!.sets,
          set: {
            ...mockWishlistState.wishlist!.sets.set,
            isLoading: {
              [mockWishlistSetId]: true,
            },
          },
        },
      },
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isAnyWishlistSetLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
        getRenderedHook(mockWishlistInitialState);

        expect(fetchWishlistSets).toHaveBeenCalledWith(undefined);
      });

      it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
        getRenderedHook(mockWishlistInitialState, { enableAutoFetch: false });

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is data', async () => {
        getRenderedHook(mockWishlistState);

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is an error', async () => {
        getRenderedHook({
          ...mockWishlistState,
          wishlist: {
            ...mockWishlistState.wishlist!,
            sets: {
              ...mockWishlistState.wishlist!.sets,
              error: new Error('dummy error') as BlackoutError,
            },
          },
        });

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('add', () => {
      it('should call `addWishlistSet` action', () => {
        const {
          actions: { add },
        } = getRenderedHook();

        add({ name: 'test', description: '', wishlistSetItems: [] });

        expect(addWishlistSet).toHaveBeenCalledWith({
          name: 'test',
          description: '',
          wishlistSetItems: [],
        });
      });
    });

    describe('fetch', () => {
      it('should call `fetchWishlistSets` action', () => {
        const {
          actions: { fetch },
        } = getRenderedHook();

        fetch();

        expect(fetchWishlistSets).toHaveBeenCalled();
      });
    });

    describe('reset', () => {
      it('should call `resetWishlistSets` action', () => {
        const {
          actions: { reset },
        } = getRenderedHook();

        reset();

        expect(resetWishlistSets).toHaveBeenCalled();
      });
    });

    describe('resetWishlistSetsState', () => {
      it('should call `resetWishlistSetsState` action', () => {
        const {
          actions: { resetWishlistSetsState: resetWishlistSetsStateAction },
        } = getRenderedHook();

        resetWishlistSetsStateAction(['error']);

        expect(resetWishlistSetsState).toHaveBeenCalled();
      });
    });

    describe('remove', () => {
      it('should call `removeWishlistSet` action', () => {
        const {
          actions: { remove },
        } = getRenderedHook();

        remove(mockWishlistSetId);

        expect(removeWishlistSet).toHaveBeenCalledWith(mockWishlistSetId);
      });
    });

    describe('fetchWishlistSet', () => {
      it('should call `fetchWishlistSet` action', () => {
        const {
          actions: { fetchWishlistSet: fetchWishlistSetAction },
        } = getRenderedHook();

        fetchWishlistSetAction(mockWishlistSetId);

        expect(fetchWishlistSet).toHaveBeenCalledWith(mockWishlistSetId);
      });
    });

    describe('update', () => {
      it('should call `updateWishlistSet` action', () => {
        const {
          actions: { update },
        } = getRenderedHook();

        update(mockWishlistSetId, mockWishlistSetPatchData);

        expect(updateWishlistSet).toHaveBeenCalledWith(
          mockWishlistSetId,
          mockWishlistSetPatchData,
        );
      });
    });
  });
});
