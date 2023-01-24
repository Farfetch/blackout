import { cleanup, renderHook } from '@testing-library/react';
import {
  expectedWishlistSetDataDenormalized,
  mockWishlistInitialState,
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useWishlistSet from '../useWishlistSet';
import useWishlistSets from '../useWishlistSets';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { UseWishlistSetOptions } from '../types';

const mockRemoveFn = jest.fn(() => ({ type: 'remove' }));
const mockUpdateFn = jest.fn(() => ({ type: 'update' }));
const mockFetchWishlistSetFn = jest.fn(() => ({ type: 'fetch' }));

jest.mock('../useWishlistSets', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      actions: {
        remove: mockRemoveFn,
        update: mockUpdateFn,
        fetchWishlistSet: mockFetchWishlistSetFn,
      },
    };
  });
});

const getRenderedHook = (
  state = mockWishlistState,
  options: UseWishlistSetOptions = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useWishlistSet(mockWishlistSetId, options), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

const defaultReturn = {
  data: {
    itemsCounter: 1,
    totalQuantity: 2,
    ...expectedWishlistSetDataDenormalized,
  },
  actions: {
    fetch: expect.any(Function),
    remove: expect.any(Function),
    update: expect.any(Function),
  },
  error: undefined,
  isFetched: true,
  isLoading: false,
};

describe('useWishlistSet', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state and call all hook dependencies with the correct options', () => {
    const current = getRenderedHook(mockWishlistInitialState);

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: undefined,
      isFetched: false,
    });

    expect(useWishlistSets).toHaveBeenCalledWith({ enableAutoFetch: false });
  });

  it('should return values correctly when it has data', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return values correctly when it has an error', () => {
    const mockError = new Error('This is an error message') as BlackoutError;
    const current = getRenderedHook({
      ...mockWishlistState,
      wishlist: {
        ...mockWishlistState.wishlist!,
        sets: {
          ...mockWishlistState.wishlist!.sets,
          set: {
            ...mockWishlistState.wishlist!.sets.set,
            error: {
              [mockWishlistSetId]: mockError,
            },
          },
        },
      },
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      error: mockError,
      isFetched: true,
    });
  });

  it('should return values correctly when it is loading', () => {
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
      isLoading: true,
      isFetched: false,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
        getRenderedHook(mockWishlistInitialState);

        expect(mockFetchWishlistSetFn).toHaveBeenCalledWith(
          mockWishlistSetId,
          undefined,
        );
      });

      it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
        getRenderedHook(mockWishlistInitialState, { enableAutoFetch: false });

        expect(mockFetchWishlistSetFn).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is data', async () => {
        getRenderedHook(mockWishlistState);

        expect(mockFetchWishlistSetFn).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but there is an error', async () => {
        getRenderedHook({
          ...mockWishlistState,
          wishlist: {
            ...mockWishlistState.wishlist!,
            sets: {
              ...mockWishlistState.wishlist!.sets,
              set: {
                ...mockWishlistState.wishlist!.sets.set,
                error: {
                  [mockWishlistSetId]: new Error(
                    'dummy error',
                  ) as BlackoutError,
                },
              },
            },
          },
        });

        expect(mockFetchWishlistSetFn).not.toHaveBeenCalled();
      });

      it('should not call `fetch` action if `enableAutoFetch` option is true but a set id is not passed to the hook', async () => {
        /** @ts-expect-error Force setId as undefined for test */
        renderHook(() => useWishlistSet(), {
          wrapper: props => (
            <Provider store={mockStore(mockWishlistState)} {...props} />
          ),
        });

        expect(mockFetchWishlistSetFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchWishlistSet` action from `useWishlistSets` hook', () => {
        const {
          actions: { fetch },
        } = getRenderedHook(undefined, { enableAutoFetch: false });

        fetch();

        expect(mockFetchWishlistSetFn).toHaveBeenCalledWith(
          mockWishlistSetId,
          undefined,
        );
      });

      it('should throw an error if the hook is not passed a set id', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
          /** @ts-expect-error Force setId as undefined for test */
        } = renderHook(() => useWishlistSet(), {
          wrapper: props => (
            <Provider store={mockStore(mockWishlistState)} {...props} />
          ),
        });

        return expect(fetch()).rejects.toThrow('No set id was specified');
      });
    });

    describe('remove', () => {
      it('should call `remove` action from `useWishlistSets` hook', () => {
        const {
          actions: { remove },
        } = getRenderedHook(undefined, { enableAutoFetch: false });

        remove();

        expect(mockRemoveFn).toHaveBeenCalledWith(mockWishlistSetId, undefined);
      });

      it('should throw an error if the hook is not passed a set id', () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
          /** @ts-expect-error Force setId as undefined for test */
        } = renderHook(() => useWishlistSet(), {
          wrapper: props => (
            <Provider store={mockStore(mockWishlistState)} {...props} />
          ),
        });

        return expect(remove()).rejects.toThrow('No set id was specified');
      });
    });

    describe('update', () => {
      it('should call `update` action from `useWishlistSets` hook', () => {
        const {
          actions: { update },
        } = getRenderedHook(undefined, { enableAutoFetch: false });

        update(mockWishlistSetPatchData);

        expect(mockUpdateFn).toHaveBeenCalledWith(
          mockWishlistSetId,
          mockWishlistSetPatchData,
          undefined,
          undefined,
        );
      });

      it('should throw an error if the hook is not passed a set id', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
          /** @ts-expect-error Force setId as undefined for test */
        } = renderHook(() => useWishlistSet(), {
          wrapper: props => (
            <Provider store={mockStore(mockWishlistState)} {...props} />
          ),
        });

        return expect(update(mockWishlistSetPatchData)).rejects.toThrow(
          'No set id was specified',
        );
      });
    });
  });
});
