import { cleanup, renderHook } from '@testing-library/react';
import { fetchUserClosets, resetUserClosets } from '@farfetch/blackout-redux';
import { merge } from 'lodash-es';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users/users.fixtures.mjs';
import { mockState } from 'tests/__fixtures__/users/userCloset.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useUserClosets from '../useUserClosets.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserClosets: jest.fn(() => ({
      type: 'fetch_user_closets',
    })),
    resetUserClosets: jest.fn(() => ({
      type: 'reset_user_closets',
    })),
  };
});

const defaultUserClosets = {
  data: undefined,
  isFetched: false,
  isLoading: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
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
      ...mockState.closets,
      error: null,
    },
  },
};

const mockErrorState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      ...mockState.closets,
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
      result: null,
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    closets: {
      ...mockState.closets,
      error: null,
      isLoading: true,
      result: null,
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useUserClosets', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosets({}), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultUserClosets);
  });

  it('should return correctly when the user closets are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosets({}), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultUserClosets,
      isFetched: true,
      data: mockInitialStateWithData.users.closets.result,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosets({}), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultUserClosets,
      isFetched: true,
      error: mockErrorState.users.closets.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useUserClosets({}), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultUserClosets,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified', () => {
        renderHook(
          () =>
            useUserClosets({
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosets).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useUserClosets({
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosets).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useUserClosets({
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserClosets).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserClosets` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserClosets({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await fetch();

        expect(fetchUserClosets).toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserClosets` action if the user is not set', async () => {
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
        } = renderHook(() => useUserClosets({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserClosets).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserClosets` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserClosets({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserClosets).not.toHaveBeenCalled();
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
        } = renderHook(() => useUserClosets(), {
          wrapper: withStore(mockInitialStateWithData),
        });

        reset();

        expect(resetUserClosets).toHaveBeenCalled();
      });
    });
  });
});
