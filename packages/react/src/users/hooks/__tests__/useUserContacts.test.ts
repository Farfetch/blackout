import { cleanup, renderHook } from '@testing-library/react';
import {
  createUserContact,
  fetchUserContacts,
  removeUserContact,
  updateUserContact,
} from '@farfetch/blackout-redux';
import {
  expectedGetContactsNormalized,
  mockAuthenticatedUserEntities,
  mockGetContactResponse,
  mockUserInitialState,
} from 'tests/__fixtures__/users/index.mjs';
import { merge } from 'lodash-es';
import {
  type PatchUserContactOperation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useUserContacts from '../useUserContacts.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserContacts: jest.fn(() => () => Promise.resolve()),
    createUserContact: jest.fn(() => () => Promise.resolve()),
    removeUserContact: jest.fn(() => () => Promise.resolve()),
    updateUserContact: jest.fn(() => () => Promise.resolve()),
  };
});

const mockInitialState = {
  entities: { ...mockAuthenticatedUserEntities },
  users: { ...mockUserInitialState, id: mockAuthenticatedUserEntities.user.id },
};

const mockWithDataState = {
  entities: {
    ...mockInitialState.entities,
    ...expectedGetContactsNormalized.entities,
  },
  users: {
    ...mockInitialState.users,
    contacts: {
      ...mockInitialState.users.contacts,
      result: expectedGetContactsNormalized.result,
      isLoading: false,
      error: null,
    },
  },
};

const mockErrorState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    contacts: {
      ...mockInitialState.users.contacts,
      result: null,
      isLoading: false,
      error: toBlackoutError(new Error('dummy error')),
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    contacts: {
      ...mockInitialState.users.contacts,
      result: null,
      isLoading: true,
      error: null,
    },
  },
};

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function),
  },
};

describe('useUserContacts', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useUserContacts(), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the contacts are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useUserContacts(), {
      wrapper: withStore(mockWithDataState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: expectedGetContactsNormalized.entities.contacts,
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useUserContacts(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.users.contacts.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useUserContacts(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should call fetch data if it is true', () => {
        renderHook(() => useUserContacts({ enableAutoFetch: true }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserContacts).toHaveBeenCalled();
      });

      it('should not fetch data if it is false', () => {
        renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserContacts).not.toHaveBeenCalled();
      });

      it('by default it should be set to true and should fetch data', () => {
        renderHook(() => useUserContacts(), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserContacts).toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserContacts` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await fetch();

        expect(fetchUserContacts).toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserContacts` action if the user is not set', async () => {
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
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserContacts).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserContacts` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(fetch()).rejects.toThrow('User is not authenticated');

        expect(fetchUserContacts).not.toHaveBeenCalled();
      });
    });

    describe('create', () => {
      it('should call `createUserContact` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await create(mockGetContactResponse);

        expect(createUserContact).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          mockGetContactResponse,
          undefined,
        );
      });

      it('should _NOT_ call `createUserContact` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(create(mockGetContactResponse)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(createUserContact).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `createUserContact` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(create(mockGetContactResponse)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(createUserContact).not.toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('should call `updateUserContact` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        const data = [
          {
            op: 'replace',
            path: '/description',
            value: 'dead',
          },
        ] as PatchUserContactOperation[];

        await update(mockGetContactResponse?.id, data);

        expect(updateUserContact).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          mockGetContactResponse?.id,
          data,
          undefined,
        );
      });

      it('should _NOT_ call `updateUserContact` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        const data = [
          {
            op: 'replace',
            path: '/description',
            value: 'dead',
          },
        ] as PatchUserContactOperation[];

        await expect(update(mockGetContactResponse?.id, data)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(updateUserContact).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `updateUserContact` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useUserContacts({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        const data = [
          {
            op: 'replace',
            path: '/description',
            value: 'dead',
          },
        ] as PatchUserContactOperation[];

        await expect(update(mockGetContactResponse?.id, data)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(updateUserContact).not.toHaveBeenCalled();
      });
    });

    describe('remove', () => {
      it('should call `removeUserContact` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useUserContacts({
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await remove(mockGetContactResponse?.id);

        expect(removeUserContact).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          mockGetContactResponse?.id,
          undefined,
        );
      });

      it('should _NOT_ call `removeUserContact` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);

        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useUserContacts({
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(remove(mockGetContactResponse?.id)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(removeUserContact).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserContact` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);

        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useUserContacts({
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(remove(mockGetContactResponse?.id)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(removeUserContact).not.toHaveBeenCalled();
      });
    });
  });
});
