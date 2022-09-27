import {
  address1,
  addressId,
  expectedGetAddressNormalizedPayload,
} from 'tests/__fixtures__/users/addresses.fixtures';
import { cleanup, renderHook } from '@testing-library/react';
import { fetchUserAddress } from '@farfetch/blackout-redux';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users';
import {
  toBlackoutError,
  UserAddress,
  UserAddressInput,
} from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers';
import merge from 'lodash/merge';
import useUserAddress from '../useUserAddress';
import useUserAddresses from '../useUserAddresses';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserAddress: jest.fn(() => () => Promise.resolve()),
}));

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserAddress: jest.fn(() => () => Promise.resolve()),
    setUserDefaultBillingAddress: jest.fn(() => () => Promise.resolve()),
    setUserDefaultShippingAddress: jest.fn(() => () => Promise.resolve()),
    setUserDefaultContactAddress: jest.fn(() => () => Promise.resolve()),
    updateUserAddress: jest.fn(
      () => (_addressId: UserAddress['id'], address: UserAddressInput) =>
        Promise.resolve(address),
    ),
    removeUserAddress: jest.fn(original.removeUserAddress),
  };
});

const mockUpdateFn = jest.fn();
const mockRemoveFn = jest.fn();
const mockSetDefaultBillingAddressFn = jest.fn();
const mockSetDefaultContactAddressFn = jest.fn();
const mockSetDefaultShippingAddressFn = jest.fn();

jest.mock('../useUserAddresses', () => {
  return jest.fn(() => {
    return {
      data: {},
      actions: {
        update: mockUpdateFn,
        remove: mockRemoveFn,
        setDefaultBillingAddress: mockSetDefaultBillingAddressFn,
        setDefaultContactAddress: mockSetDefaultContactAddressFn,
        setDefaultShippingAddress: mockSetDefaultShippingAddressFn,
      },
    };
  });
});

const mockInitialState = {
  entities: { ...mockAuthenticatedUserEntities },
  users: { ...mockUserInitialState, id: mockAuthenticatedUserEntities.user.id },
};

const mockWithDataState = {
  entities: {
    ...mockInitialState.entities,
    ...expectedGetAddressNormalizedPayload.entities,
  },
  users: {
    ...mockInitialState.users,
    addresses: {
      ...mockInitialState.users.addresses,
      result: [expectedGetAddressNormalizedPayload.result],
      isLoading: false,
      error: null,
      address: {
        error: {},
        isLoading: {},
      },
    },
  },
};

const mockErrorState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    addresses: {
      ...mockInitialState.users.addresses,
      result: null,
      isLoading: false,
      error: null,
      address: {
        error: { [addressId]: toBlackoutError(new Error('dummy error')) },
        isLoading: {},
      },
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  users: {
    ...mockInitialState.users,
    addresses: {
      ...mockInitialState.users.addresses,
      result: null,
      isLoading: true,
      error: null,
      address: {
        error: {},
        isLoading: { [addressId]: true },
      },
    },
  },
};

const defaultReturn = {
  data: undefined,
  isLoading: undefined,
  isFetched: false,
  error: undefined,
  actions: {
    fetch: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function),
    setDefaultBillingAddress: expect.any(Function),
    setDefaultShippingAddress: expect.any(Function),
    setDefaultContactAddress: expect.any(Function),
  },
};

describe('useUserAddress', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state and call `useUserAddress` hook with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddress(addressId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);

    expect(useUserAddresses).toHaveBeenCalledWith({
      enableAutoFetch: false,
      manageDefaultsOnRemoveAddress: false,
    });
  });

  it('should return correctly when the address is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddress(addressId), {
      wrapper: withStore(mockWithDataState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: mockWithDataState.entities.addresses[addressId],
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddress(addressId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.users.addresses.address.error[addressId],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddress(addressId), {
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
        renderHook(() => useUserAddress(addressId, { enableAutoFetch: true }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          addressId,
          undefined,
        );
      });

      it('should not fetch data if it is false', () => {
        renderHook(
          () => useUserAddress(addressId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(fetchUserAddress).not.toHaveBeenCalled();
      });

      it('by default it should be set to true and should fetch data', () => {
        renderHook(() => useUserAddress(addressId), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          addressId,
          undefined,
        );
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserAddress` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useUserAddress(addressId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await fetch();

        expect(fetchUserAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          addressId,
          undefined,
        );
      });

      it('should _NOT_ call `fetchUserAddress` action if the user is not set', async () => {
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
          () => useUserAddress(addressId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(() => fetch()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useUserAddress(addressId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(() => fetch()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserAddress).not.toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('should call `update` from `useUserAddresses` hook with the correct parameters', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () => useUserAddress(addressId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const options = {
          defaultBilling: true,
          defaultShipping: true,
          defaultContact: true,
        };

        await update(address1, options);

        expect(mockUpdateFn).toHaveBeenCalledWith(
          address1.id,
          address1,
          options,
        );
      });
    });

    describe('remove', () => {
      it('should call `remove` from `useUserAddresses` hook with the correct parameters', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useUserAddress(addressId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await remove();

        expect(mockRemoveFn).toHaveBeenCalledWith(addressId, undefined);
      });
    });

    describe('setDefaultBillingAddress', () => {
      it('should call `setDefaultBillingAddress` from `useUserAddresses` hook with the correct parameters', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultBillingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddress(addressId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultBillingAddress();

        expect(mockSetDefaultBillingAddressFn).toHaveBeenCalledWith(
          addressId,
          undefined,
        );
      });
    });

    describe('setDefaultShippingAddress', () => {
      it('should call `setDefaultShippingAddress` from `useUserAddresses` hook with the correct parameters', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultShippingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddress(addressId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultShippingAddress();

        expect(mockSetDefaultShippingAddressFn).toHaveBeenCalledWith(
          addressId,
          undefined,
        );
      });
    });

    describe('setDefaultContactAddress', () => {
      it('should call `setDefaultContactAddress` from `useUserAddresses` hook with the correct parameters', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultContactAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddress(addressId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultContactAddress();

        expect(mockSetDefaultContactAddressFn).toHaveBeenCalledWith(
          addressId,
          undefined,
        );
      });
    });
  });
});
