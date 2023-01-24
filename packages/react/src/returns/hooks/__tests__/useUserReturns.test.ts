import { act, cleanup, renderHook } from '@testing-library/react';
import { getUserReturns, toBlackoutError } from '@farfetch/blackout-client';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users/index.mjs';
import { mockUserReturnsResponse } from 'tests/__fixtures__/users/userReturns.fixtures.mjs';
import { useUserReturns } from '../../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';
import flushPromises from 'tests/flushPromises.mjs';

jest.mock('@farfetch/blackout-client', () => {
  const original = jest.requireActual('@farfetch/blackout-client');

  return {
    ...original,
    getUserReturns: jest.fn(() => Promise.resolve(mockUserReturnsResponse)),
  };
});

const mockFetchUserReturnsError = toBlackoutError(new Error('dummy error'));

const defaultUserReturns = {
  data: undefined,
  isLoading: false,
  error: null,
  isFetched: false,
  actions: {
    createReturn: expect.any(Function),
    fetch: expect.any(Function),
    fetchReturn: expect.any(Function),
    resetReturnState: expect.any(Function),
    updateReturn: expect.any(Function),
  },
};

const defaultUserReturnsFetched = {
  ...defaultUserReturns,
};

const mockUserId = 56681854;
const mockFetchQuery = {
  page: 1,
};
const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useUserReturns', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(
      () =>
        useUserReturns({
          enableAutoFetch: false,
          fetchConfig: mockFetchConfig,
        }),
      {
        wrapper: withStore({
          entities: mockAuthenticatedUserEntities,
          users: mockUserInitialState,
        }),
      },
    );

    expect(current).toStrictEqual(defaultUserReturns);

    expect(getUserReturns).not.toHaveBeenCalled();
  });

  it('should return correctly when the user returns request is fetched', async () => {
    const { result } = renderHook(
      () =>
        useUserReturns({
          enableAutoFetch: false,
          fetchConfig: mockFetchConfig,
        }),
      {
        wrapper: withStore({
          entities: mockAuthenticatedUserEntities,
          users: mockUserInitialState,
        }),
      },
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultUserReturnsFetched,
    });
  });

  it('should return correctly when there is an error', async () => {
    (getUserReturns as jest.Mock).mockRejectedValueOnce(
      mockFetchUserReturnsError,
    );

    const { result } = renderHook(
      () =>
        useUserReturns({
          enableAutoFetch: true,
          fetchConfig: mockFetchConfig,
        }),
      {
        wrapper: withStore({
          entities: mockAuthenticatedUserEntities,
          users: mockUserInitialState,
        }),
      },
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultUserReturns,
      isLoading: false,
      isFetched: true,
      error: mockFetchUserReturnsError,
    });
  });

  it('should return correctly when it is loading', () => {
    const { result } = renderHook(
      () =>
        useUserReturns({
          enableAutoFetch: true,
          fetchConfig: mockFetchConfig,
        }),
      {
        wrapper: withStore({
          entities: mockAuthenticatedUserEntities,
          users: mockUserInitialState,
        }),
      },
    );

    expect(result.current).toStrictEqual({
      ...defaultUserReturns,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useUserReturns({
              enableAutoFetch: true,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore({
              entities: mockAuthenticatedUserEntities,
              users: mockUserInitialState,
            }),
          },
        );

        expect(getUserReturns).toHaveBeenCalledWith(
          mockUserId,
          undefined,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is not passed', () => {
        renderHook(
          () =>
            useUserReturns({
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore({
              entities: mockAuthenticatedUserEntities,
              users: mockUserInitialState,
            }),
          },
        );

        expect(getUserReturns).toHaveBeenCalledWith(
          mockUserId,
          undefined,
          mockFetchConfig,
        );
      });

      it('should fetch data if fetchQuery option is passed', () => {
        renderHook(
          () =>
            useUserReturns({
              fetchQuery: mockFetchQuery,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore({
              entities: mockAuthenticatedUserEntities,
              users: mockUserInitialState,
            }),
          },
        );

        expect(getUserReturns).toHaveBeenCalledWith(
          mockUserId,
          mockFetchQuery,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useUserReturns({
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore({
              entities: mockAuthenticatedUserEntities,
              users: mockUserInitialState,
            }),
          },
        );

        expect(getUserReturns).not.toHaveBeenCalled();
      });
    });

    describe('actions', () => {
      describe('fetch', () => {
        it('should call `getUserReturns` fetch action', async () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(
            () =>
              useUserReturns({
                enableAutoFetch: false,
                fetchQuery: mockFetchQuery,
                fetchConfig: mockFetchConfig,
              }),
            {
              wrapper: withStore({
                entities: mockAuthenticatedUserEntities,
                users: mockUserInitialState,
              }),
            },
          );

          await fetch();

          expect(getUserReturns).toHaveBeenCalledWith(
            mockUserId,
            mockFetchQuery,
            mockFetchConfig,
          );
        });
      });
    });
  });
});
