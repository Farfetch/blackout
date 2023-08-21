import { cleanup, renderHook } from '@testing-library/react';
import {
  closetId,
  closetItemId,
  mockState,
} from 'tests/__fixtures__/users/userCloset.fixtures.mjs';
import {
  fetchUserClosetItems,
  removeUserClosetItem as removeUserClosetItemAction,
  resetUserClosetItems,
} from '@farfetch/blackout-redux';
import { merge } from 'lodash-es';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users/users.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useUserClosetItems from '../useUserClosetItems.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserClosetItems: jest.fn(() => ({
      type: 'fetch_user_closet_items',
    })),
    removeUserClosetItem: jest.fn(() => ({
      type: 'remove_user_closet_item',
    })),
    resetUserClosetItems: jest.fn(() => ({
      type: 'reset_user_closet_items',
    })),
  };
});

const defaultUserCloset = {
  data: undefined,
  isFetched: false,
  isLoading: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    removeUserClosetItem: expect.any(Function),
    reset: expect.any(Function),
  },
};

const mockInitialState = {
  entities: { ...mockAuthenticatedUserEntities },
  users: { ...mockUserInitialState, id: mockAuthenticatedUserEntities.user.id },
};

const mockInitialStateNoData = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      error: null,
      isLoading: false,
      result: null,
      closetItems: {
        error: null,
        isLoading: false,
        result: null,
      },
    },
  },
};

const mockInitialStateWithData = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      error: null,
      isLoading: false,
      result: null,
      closetItems: {
        ...mockState.closets.closetItems,
        error: null,
      },
    },
  },
};

const mockErrorState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      ...mockState.closets,
      closetItems: {
        error: toBlackoutError(new Error('dummy error')),
        isLoading: false,
        result: null,
      },
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      ...mockState.closets,
      closetItems: {
        error: null,
        isLoading: true,
        result: null,
      },
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useUserClosetItems', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosetItems(closetId, {}), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultUserCloset);
  });

  it('should return correctly when the user closet is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosetItems(closetId, {}), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultUserCloset,
      isFetched: true,
      data: mockInitialStateWithData.users.closets.closetItems.result,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosetItems(closetId, {}), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultUserCloset,
      isFetched: true,
      error: mockErrorState.users.closets.closetItems.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosetItems(closetId, {}), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultUserCloset,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and closetId parameter is passed', () => {
        renderHook(
          () =>
            useUserClosetItems(closetId, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosetItems).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          closetId,
          undefined,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true and closetId parameter is passed', () => {
        renderHook(
          () =>
            useUserClosetItems(closetId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosetItems).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          closetId,
          undefined,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useUserClosetItems(closetId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosetItems).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and closetId parameter is not passed', () => {
        // @ts-expect-error Forcing closetId undefined to test
        renderHook(() => useUserClosetItems(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchUserClosetItems).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserCloset` action if the user is authenticated and closetId is passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await fetch();

        expect(fetchUserClosetItems).toHaveBeenCalled();
      });

      it('should call `fetchUserCloset` action if the user is authenticated and closetId is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          // @ts-expect-error
          () => useUserClosetItems(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const anotherConfig = {};
        const query = {};

        await fetch(query, anotherConfig, closetId);

        expect(fetchUserClosetItems).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          closetId,
          query,
          anotherConfig,
        );
      });

      it('should _NOT_ call `fetchUserCloset` action if the user is not set and closetId is passed', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserClosetItems).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserCloset` action if the user is set but the closedId parameter is not passed either to the hook or function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          // @ts-expect-error
          () => useUserClosetItems(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await expect(fetch()).rejects.toThrow('No closetId provided');

        expect(fetchUserClosetItems).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserCloset` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserClosetItems).not.toHaveBeenCalled();
      });
    });

    describe('removeUserClosetItem', () => {
      it('should call `removeUserClosetItem` action if the user is authenticated and closetId is passed to the hook and itemId is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { removeUserClosetItem },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await removeUserClosetItem(closetItemId);

        expect(removeUserClosetItemAction).toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserClosetItem` action if the user is not set and closetId is passed to the hook and itemId is passed to the function', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { removeUserClosetItem },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(removeUserClosetItem(closetItemId)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(removeUserClosetItemAction).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserClosetItem` action if the user is authenticated and closetId is not passed to the hook and itemId is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { removeUserClosetItem },
            },
          },
        } = renderHook(
          // @ts-expect-error
          () => useUserClosetItems(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await expect(removeUserClosetItem(closetItemId)).rejects.toThrow(
          'No closetId provided',
        );

        expect(removeUserClosetItemAction).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserClosetItem` action if the user is authenticated and closetId is passed to the hook and itemId is not passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { removeUserClosetItem },
            },
          },
        } = renderHook(
          () => useUserClosetItems(closetId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        // @ts-expect-error
        await expect(removeUserClosetItem(undefined)).rejects.toThrow(
          'No itemId provided',
        );

        expect(removeUserClosetItemAction).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserClosetItem` action if the user is authenticated and both closetId and itemId are not passed', async () => {
        const {
          result: {
            current: {
              actions: { removeUserClosetItem },
            },
          },
        } = renderHook(
          // @ts-expect-error
          () => useUserClosetItems(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        // @ts-expect-error
        await expect(removeUserClosetItem(undefined)).rejects.toThrow(
          'No closetId provided',
        );

        expect(removeUserClosetItemAction).not.toHaveBeenCalled();
      });
    });

    describe('reset', () => {
      it('should call `resetUserClosets` action', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useUserClosetItems(closetId), {
          wrapper: withStore(mockInitialStateWithData),
        });

        reset();

        expect(resetUserClosetItems).toHaveBeenCalled();
      });
    });
  });
});
