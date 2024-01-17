import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchUserCreditMovements,
  fetchUserCredits,
} from '@farfetch/blackout-redux';
import { merge } from 'lodash-es';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users/users.fixtures.mjs';
import { mockStateCreditMovements } from 'tests/__fixtures__/users/creditMovements.fixtures.mjs';
import { mockStateCredits } from 'tests/__fixtures__/users/credit.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import userUserCredit from '../useUserCredit.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserCredits: jest.fn(() => ({
      type: 'fetch_user_credits',
    })),
    fetchUserCreditMovements: jest.fn(() => ({
      type: 'reset_user_credit_movements',
    })),
  };
});

const defaultUserCredit = {
  data: undefined,
  isLoading: false,
  error: null,
  isFetched: false,
  areMovementsFetched: false,
  areMovementsLoading: false,
  movementsError: null,
  actions: {
    fetch: expect.any(Function),
    fetchMovements: expect.any(Function),
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
    credits: {
      isLoading: false,
      error: null,
    },
    creditMovements: {
      isLoading: false,
      error: null,
    },
  },
};

const credits = [
  {
    currency: 'GB',
    value: 50,
    formattedValue: '£50',
  },
];

const creditMovements = {
  entries: [
    {
      type: 1,
      value: 0.57,
      formattedValue: '$0.57',
      currency: 'USD',
      description: 'Other Reason (FF fault)',
      createdOn: '/Date(1581071861195)/',
    },
  ],
  number: 1,
  totalItems: 1,
  totalPages: 1,
};

const mockInitialStateWithData = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      ...mockInitialState.entities.user,
      credits,
      creditMovements,
    },
  },
  users: {
    ...mockInitialState.users,
    credits: {
      isLoading: false,
      error: null,
    },
  },
};

const mockInitialStateWithCredits = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      ...mockInitialState.entities.user,
      credits,
    },
  },
  users: {
    ...mockInitialState.users,
    credits: {
      isLoading: false,
      error: null,
    },
  },
};

const mockInitialStateWithCreditMovements = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      ...mockInitialState.entities.user,
      creditMovements,
    },
  },
  users: {
    ...mockInitialState.users,
    credits: {
      isLoading: false,
      error: null,
    },
  },
};

const mockErrorStateCredits = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    credits: {
      ...mockStateCredits.credits,
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
    },
  },
};

const mockLoadingStateCredits = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    credits: {
      ...mockStateCredits.credits,
      error: null,
      isLoading: true,
    },
  },
};

const mockErrorStateCreditMovements = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    creditMovements: {
      ...mockStateCreditMovements.credits,
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
    },
  },
};

const mockLoadingStateCreditMovements = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    creditMovements: {
      ...mockStateCreditMovements.credits,
      error: null,
      isLoading: true,
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useUserCredit', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => userUserCredit({}), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultUserCredit);
  });

  it('should return correctly when both the user credits and credit movements are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => userUserCredit({}), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultUserCredit,
      isFetched: true,
      areMovementsFetched: true,
      data: {
        userCredits: credits,
        userCreditMovements: creditMovements,
      },
    });
  });

  it('should return undefined when both the user credits and credit movement are not fetched', () => {
    const {
      result: { current },
    } = renderHook(() => userUserCredit({}), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual({
      ...defaultUserCredit,
      isFetched: false,
      areMovementsFetched: false,
      data: undefined,
    });
  });

  describe('userCredits', () => {
    it('should return correctly when only the user credits are fetched', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockInitialStateWithCredits),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        isFetched: true,
        areMovementsFetched: false,
        data: {
          userCredits: credits,
          userCreditMovements: undefined,
        },
      });
    });

    it('should return correctly when there is an error', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockErrorStateCredits),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        isFetched: true,
        error: mockErrorStateCredits.users.credits.error,
      });
    });

    it('should return correctly when it is loading', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockLoadingStateCredits),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        isLoading: true,
      });
    });
  });

  describe('userCreditMovements', () => {
    it('should return correctly when only the user credit movements are fetched', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockInitialStateWithCreditMovements),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        isFetched: false,
        areMovementsFetched: true,
        data: {
          userCredits: undefined,
          userCreditMovements: creditMovements,
        },
      });
    });

    it('should return correctly when there is an error', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockErrorStateCreditMovements),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        areMovementsFetched: true,
        movementsError:
          mockErrorStateCreditMovements.users.creditMovements.error,
      });
    });

    it('should return correctly when it is loading', () => {
      const {
        result: { current },
      } = renderHook(() => userUserCredit({}), {
        wrapper: withStore(mockLoadingStateCreditMovements),
      });

      expect(current).toStrictEqual({
        ...defaultUserCredit,
        areMovementsFetched: false,
        areMovementsLoading: true,
      });
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified', () => {
        renderHook(
          () =>
            userUserCredit({
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserCredits).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            userUserCredit({
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserCredits).toHaveBeenCalledWith(
          mockAuthenticatedUserEntities.user.id,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            userUserCredit({
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchUserCredits).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserCredits` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await fetch();

        expect(fetchUserCredits).toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserCredits` action if the user is not set', async () => {
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
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserCredits).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserCredits` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserCredits).not.toHaveBeenCalled();
      });
    });

    describe('fetchMovements', () => {
      it('should call `fetchMovements` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetchMovements },
            },
          },
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await fetchMovements();

        expect(fetchUserCreditMovements).toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchMovements` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { fetchMovements },
            },
          },
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(fetchMovements()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserCreditMovements).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchMovements` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetchMovements },
            },
          },
        } = renderHook(() => userUserCredit({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(fetchMovements()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserCreditMovements).not.toHaveBeenCalled();
      });
    });
  });
});
