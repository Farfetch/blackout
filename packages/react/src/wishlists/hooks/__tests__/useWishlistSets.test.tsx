import {
  addWishlistSet,
  fetchWishlistSet,
  fetchWishlistSets,
  removeWishlistSet,
  resetWishlistSets,
  updateWishlistSet,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import {
  expectedWishlistSetsDataDenormalized,
  mockWishlistInitialState,
  mockWishlistInitialStateWithoutUser,
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { mockStore } from '../../../../tests/helpers/index.js';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlistSets from '../useWishlistSets.js';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { UseWishlistSetsOptions } from '../types/index.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addWishlistSet: jest.fn(() => ({ type: 'add' })),
  fetchWishlistSets: jest.fn(() => ({ type: 'fetch' })),
  resetWishlistSets: jest.fn(() => ({ type: 'reset' })),
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
      it('should call `fetch` action if `enableAutoFetch` option is true and user is set', () => {
        getRenderedHook(mockWishlistInitialState);

        expect(fetchWishlistSets).toHaveBeenCalledWith(
          mockWishlistInitialState.entities?.user?.wishlistId,
          undefined,
        );
      });

      it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
        getRenderedHook(mockWishlistInitialState, { enableAutoFetch: false });

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is no user set', () => {
        getRenderedHook(mockWishlistInitialStateWithoutUser);

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is data', () => {
        getRenderedHook(mockWishlistState);

        expect(fetchWishlistSets).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is an error', () => {
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
      it('should call `addWishlistSet` action when user is set', () => {
        const {
          actions: { add },
        } = getRenderedHook();

        add({ name: 'test', description: '', wishlistSetItems: [] });

        expect(addWishlistSet).toHaveBeenCalledWith(
          mockWishlistState.entities?.user?.wishlistId,
          {
            name: 'test',
            description: '',
            wishlistSetItems: [],
          },
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          actions: { add },
        } = getRenderedHook(mockWishlistInitialStateWithoutUser);

        await expect(() =>
          add({ name: 'test', description: '', wishlistSetItems: [] }),
        ).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(addWishlistSet).not.toHaveBeenCalled();
      });
    });

    describe('fetch', () => {
      it('should call `fetchWishlistSets` action when user is set', () => {
        const {
          actions: { fetch },
        } = getRenderedHook(mockWishlistState, { enableAutoFetch: false });

        fetch();

        expect(fetchWishlistSets).toHaveBeenCalledWith(
          mockWishlistState.entities?.user?.wishlistId,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          actions: { fetch },
        } = getRenderedHook(mockWishlistInitialStateWithoutUser);

        await expect(() => fetch()).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(fetchWishlistSets).not.toHaveBeenCalled();
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

    describe('remove', () => {
      it('should call `removeWishlistSet` action when user is set', () => {
        const {
          actions: { remove },
        } = getRenderedHook();

        remove(mockWishlistSetId);

        expect(removeWishlistSet).toHaveBeenCalledWith(
          mockWishlistState.entities?.user?.wishlistId,
          mockWishlistSetId,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          actions: { remove },
        } = getRenderedHook(mockWishlistInitialStateWithoutUser);

        await expect(() => remove(mockWishlistSetId)).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(removeWishlistSet).not.toHaveBeenCalled();
      });
    });

    describe('fetchWishlistSet', () => {
      it('should call `fetchWishlistSet` action when user is set', () => {
        const {
          actions: { fetchWishlistSet: fetchWishlistSetAction },
        } = getRenderedHook();

        fetchWishlistSetAction(mockWishlistSetId);

        expect(fetchWishlistSet).toHaveBeenCalledWith(
          mockWishlistState.entities?.user?.wishlistId,
          mockWishlistSetId,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          actions: { fetchWishlistSet: fetchWishlistSetAction },
        } = getRenderedHook(mockWishlistInitialStateWithoutUser);

        await expect(() =>
          fetchWishlistSetAction(mockWishlistSetId),
        ).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(fetchWishlistSet).not.toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('should call `updateWishlistSet` action when user is set', () => {
        const {
          actions: { update },
        } = getRenderedHook();

        update(mockWishlistSetId, mockWishlistSetPatchData);

        expect(updateWishlistSet).toHaveBeenCalledWith(
          mockWishlistState.entities?.user?.wishlistId,
          mockWishlistSetId,
          mockWishlistSetPatchData,
          undefined,
          undefined,
        );
      });

      it('should throw an error when user is not set', async () => {
        const {
          actions: { update },
        } = getRenderedHook(mockWishlistInitialStateWithoutUser);

        await expect(() =>
          update(mockWishlistSetId, mockWishlistSetPatchData),
        ).rejects.toThrow(
          "User's wishlist id is not loaded. Please, fetch the user before using this action",
        );

        expect(updateWishlistSet).not.toHaveBeenCalled();
      });
    });
  });
});
