import {
  address1,
  address3,
  addressId,
  addressId2,
  expectedGetAddressesNormalizedPayload,
  mockGetAddressesResponse,
} from 'tests/__fixtures__/users/addresses.fixtures';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { cleanup, renderHook } from '@testing-library/react';
import {
  createDefaultEntitiesReducer,
  createUserAddress,
  fetchUserAddresses,
  removeUserAddress,
  setUserDefaultBillingAddress,
  setUserDefaultContactAddress,
  setUserDefaultShippingAddress,
  updateUserAddress,
  usersReducer,
} from '@farfetch/blackout-redux';
import { flushPromises, withStore } from '../../../../tests/helpers';
import {
  mockAuthenticatedUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users';
import { Provider } from 'react-redux';
import merge from 'lodash/merge';
import React from 'react';
import thunk from 'redux-thunk';
import useUserAddresses from '../useUserAddresses';
import type {
  BlackoutError,
  UserAddress,
  UserAddressInput,
} from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserAddress: jest.fn(() => () => Promise.resolve()),
}));

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchUserAddresses: jest.fn(() => () => Promise.resolve()),
    setUserDefaultBillingAddress: jest.fn(() => () => Promise.resolve()),
    setUserDefaultShippingAddress: jest.fn(() => () => Promise.resolve()),
    setUserDefaultContactAddress: jest.fn(() => () => Promise.resolve()),
    createUserAddress: jest.fn(
      (userId, address) => () => Promise.resolve(address),
    ),
    updateUserAddress: jest.fn(
      () => (_addressId: UserAddress['id'], address: UserAddressInput) =>
        Promise.resolve(address),
    ),
    removeUserAddress: jest.fn(original.removeUserAddress),
  };
});

const mockInitialState = {
  entities: { ...mockAuthenticatedUserEntities },
  users: { ...mockUserInitialState, id: mockAuthenticatedUserEntities.user.id },
};

const mockWithDataState = {
  entities: {
    ...mockInitialState.entities,
    ...expectedGetAddressesNormalizedPayload.entities,
  },
  users: {
    ...mockInitialState.users,
    addresses: {
      ...mockInitialState.users.addresses,
      result: expectedGetAddressesNormalizedPayload.result,
      isLoading: false,
      error: null,
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
      error: new Error('dummy error') as BlackoutError,
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
    },
  },
};

const mockDefaultAddresses = {
  billing: address1,
  shipping: address1,
  contact: address1,
};

const defaultReturn = {
  data: {
    addresses: [],
    defaultAddresses: {
      billing: undefined,
      contact: undefined,
      shipping: undefined,
    },
  },
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    add: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function),
    setDefaultBillingAddress: expect.any(Function),
    setDefaultShippingAddress: expect.any(Function),
    setDefaultContactAddress: expect.any(Function),
  },
};

const reducer = combineReducers({
  entities: createDefaultEntitiesReducer([]),
  users: usersReducer,
});

const enhancers = applyMiddleware(thunk);

describe('useUserAddresses', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddresses(), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the addresses are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddresses(), {
      wrapper: withStore(mockWithDataState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: {
        addresses: mockGetAddressesResponse,
        defaultAddresses: mockDefaultAddresses,
      },
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddresses(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.users.addresses.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useUserAddresses(), {
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
        renderHook(() => useUserAddresses({ enableAutoFetch: true }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserAddresses).toHaveBeenCalled();
      });

      it('should not fetch data if it is false', () => {
        renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserAddresses).not.toHaveBeenCalled();
      });

      it('by default it should be set to true and should fetch data', () => {
        renderHook(() => useUserAddresses(), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchUserAddresses).toHaveBeenCalled();
      });
    });

    describe('manageDefaultsOnRemoveAddress', () => {
      describe('when it is true', () => {
        it('should change default shipping address if the current one is removed', async () => {
          const mockStoreWithDefaultShippingAddress = merge(
            {},
            mockWithDataState,
            {
              entities: {
                addresses: {
                  [addressId]: {
                    isCurrentShipping: true,
                    isCurrentBilling: false,
                  },
                  [addressId2]: {
                    isCurrentShipping: false,
                    isCurrentBilling: true,
                  },
                },
              },
            },
          );

          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(() => useUserAddresses(), {
            wrapper: props => (
              <Provider
                store={createStore(
                  reducer,
                  mockStoreWithDefaultShippingAddress,
                  enhancers,
                )}
                {...props}
              />
            ),
          });

          // Remove the first address which is only the default shipping address
          remove(mockWithDataState.users.addresses.result?.[0] as string);

          await flushPromises();

          const expectedUserId = mockWithDataState.entities.user.id;
          const expectedNewDefaultAddressId =
            mockWithDataState.users.addresses.result?.[1];

          expect(setUserDefaultShippingAddress).toHaveBeenCalledWith(
            expectedUserId,
            expectedNewDefaultAddressId,
            undefined,
          );
          expect(setUserDefaultBillingAddress).not.toHaveBeenCalled();
        });

        it('should change default billing address if the current one is removed', async () => {
          const mockStoreWithDefaultBillingAddress = merge(
            {},
            mockWithDataState,
            {
              entities: {
                addresses: {
                  [addressId]: {
                    isCurrentShipping: false,
                    isCurrentBilling: true,
                  },
                  [addressId2]: {
                    isCurrentShipping: true,
                    isCurrentBilling: false,
                  },
                },
              },
            },
          );

          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(() => useUserAddresses(), {
            wrapper: props => (
              <Provider
                store={createStore(
                  reducer,
                  mockStoreWithDefaultBillingAddress,
                  enhancers,
                )}
                {...props}
              />
            ),
          });

          // Remove the first address which is only the default billing address
          remove(mockWithDataState.users.addresses.result?.[0] as string);
          await flushPromises();

          const expectedUserId = mockWithDataState.entities.user.id;
          const expectedNewDefaultAddressId =
            mockWithDataState.users.addresses.result?.[1];

          expect(setUserDefaultBillingAddress).toHaveBeenCalledWith(
            expectedUserId,
            expectedNewDefaultAddressId,
            undefined,
          );
          expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
        });

        it('should change both the default shipping and billing addresses if there are none after an address is removed', async () => {
          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(() => useUserAddresses(), {
            wrapper: props => (
              <Provider
                store={createStore(reducer, mockWithDataState, enhancers)}
                {...props}
              />
            ),
          });

          // Remove the first address which is both the default shipping and billing address
          remove(mockWithDataState.users.addresses.result?.[0] as string);

          await flushPromises();

          const expectedUserId = mockWithDataState.entities.user.id;
          const expectedNewDefaultAddressId =
            mockWithDataState.users.addresses.result?.[1];

          expect(setUserDefaultShippingAddress).toHaveBeenCalledWith(
            expectedUserId,
            expectedNewDefaultAddressId,
            undefined,
          );
          expect(setUserDefaultBillingAddress).toHaveBeenCalledWith(
            expectedUserId,
            expectedNewDefaultAddressId,
            undefined,
          );
        });
      });

      describe('when it is false', () => {
        it('should _NOT_ change default shipping address if the current one is removed', async () => {
          const mockStoreWithDefaultShippingAddress = merge(
            {},
            mockWithDataState,
            {
              entities: {
                addresses: {
                  [addressId]: {
                    isCurrentShipping: true,
                    isCurrentBilling: false,
                  },
                  [addressId2]: {
                    isCurrentShipping: false,
                    isCurrentBilling: true,
                  },
                },
              },
            },
          );

          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(
            () => useUserAddresses({ manageDefaultsOnRemoveAddress: false }),
            {
              wrapper: props => (
                <Provider
                  store={createStore(
                    reducer,
                    mockStoreWithDefaultShippingAddress,
                    enhancers,
                  )}
                  {...props}
                />
              ),
            },
          );

          // Remove the first address which is only the default shipping address
          remove(mockWithDataState.users.addresses.result?.[0] as string);

          await flushPromises();

          expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
          expect(setUserDefaultBillingAddress).not.toHaveBeenCalled();
        });

        it('should _NOT_ change default billing address if the current one is removed', async () => {
          const mockStoreWithDefaultBillingAddress = merge(
            {},
            mockWithDataState,
            {
              entities: {
                addresses: {
                  [addressId]: {
                    isCurrentShipping: false,
                    isCurrentBilling: true,
                  },
                  [addressId2]: {
                    isCurrentShipping: true,
                    isCurrentBilling: false,
                  },
                },
              },
            },
          );

          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(
            () => useUserAddresses({ manageDefaultsOnRemoveAddress: false }),
            {
              wrapper: props => (
                <Provider
                  store={createStore(
                    reducer,
                    mockStoreWithDefaultBillingAddress,
                    enhancers,
                  )}
                  {...props}
                />
              ),
            },
          );

          // Remove the first address which is only the default billing address
          remove(mockWithDataState.users.addresses.result?.[0] as string);
          await flushPromises();

          expect(setUserDefaultBillingAddress).not.toHaveBeenCalledWith();
          expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
        });

        it('should _NOT_ change both the default shipping and billing addresses if there are none after an address is removed', async () => {
          const {
            result: {
              current: {
                actions: { remove },
              },
            },
          } = renderHook(
            () => useUserAddresses({ manageDefaultsOnRemoveAddress: false }),
            {
              wrapper: props => (
                <Provider
                  store={createStore(reducer, mockWithDataState, enhancers)}
                  {...props}
                />
              ),
            },
          );

          // Remove the first address which is both the default shipping and billing address
          remove(mockWithDataState.users.addresses.result?.[0] as string);
          await flushPromises();

          expect(setUserDefaultShippingAddress).not.toHaveBeenCalledWith();
          expect(setUserDefaultBillingAddress).not.toHaveBeenCalledWith();
        });
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchUserAddresses` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        await fetch();

        expect(fetchUserAddresses).toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserAddresses` action if the user is not set', async () => {
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
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(() => fetch()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserAddresses).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `fetchUserAddresses` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(() => fetch()).rejects.toThrow(
          'User is not authenticated',
        );

        expect(fetchUserAddresses).not.toHaveBeenCalled();
      });
    });

    describe('add', () => {
      describe('when options are not passed', () => {
        it('should call `createUserAddress` action if the user is authenticated', async () => {
          const {
            result: {
              current: {
                actions: { add },
              },
            },
          } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await add(address3);

          expect(createUserAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3,
            undefined,
          );

          expect(setUserDefaultBillingAddress).not.toHaveBeenCalled();
          expect(setUserDefaultContactAddress).not.toHaveBeenCalled();
          expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
        });
      });

      describe('when options are passed', () => {
        it('should update the created address by setting it as the desired defaults', async () => {
          const {
            result: {
              current: {
                actions: { add },
              },
            },
          } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await add(address3, {
            defaultBilling: true,
            defaultContact: true,
            defaultShipping: true,
          });

          expect(createUserAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3,
            undefined,
          );

          expect(setUserDefaultBillingAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
          expect(setUserDefaultContactAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
          expect(setUserDefaultShippingAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
        });
      });

      it('should _NOT_ call `createUserAddress` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);
        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { add },
            },
          },
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(() => add(address3)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(createUserAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `createUserAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { add },
            },
          },
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(() => add(address3)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(createUserAddress).not.toHaveBeenCalled();
      });
    });

    describe('update', () => {
      describe('when options are not passed', () => {
        it('should call `updateUserAddress` action if the user is authenticated', async () => {
          const {
            result: {
              current: {
                actions: { update },
              },
            },
          } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await update(address1.id, address1);

          expect(updateUserAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address1.id,
            address1,
            undefined,
          );
        });
      });

      describe('when options are passed', () => {
        it('should update the updated address by setting it as the desired defaults', async () => {
          const {
            result: {
              current: {
                actions: { update },
              },
            },
          } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await update(address3.id, address3, {
            defaultBilling: true,
            defaultContact: true,
            defaultShipping: true,
          });

          expect(updateUserAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            address3,
            undefined,
          );

          expect(setUserDefaultBillingAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
          expect(setUserDefaultContactAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
          expect(setUserDefaultShippingAddress).toHaveBeenCalledWith(
            mockInitialState.entities.user.id,
            address3.id,
            undefined,
          );
        });
      });

      it('should _NOT_ call `updateUserAddress` action if the user is not set', async () => {
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
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithoutUserState),
        });

        await expect(() => update(address1.id, address1)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(updateUserAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `updateUserAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useUserAddresses({ enableAutoFetch: false }), {
          wrapper: withStore(mockWithGuestUserState),
        });

        await expect(() => update(address1.id, address1)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(updateUserAddress).not.toHaveBeenCalled();
      });
    });

    describe('remove', () => {
      it('should call `removeUserAddress` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await remove(address1.id);

        expect(removeUserAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          address1.id,
          undefined,
        );
      });

      it('should _NOT_ call `removeUserAddress` action if the user is not set', async () => {
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
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(() => remove(address1.id)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(removeUserAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `removeUserAddress` action if the user is guest', async () => {
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
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(() => remove(address1.id)).rejects.toThrow(
          'User is not authenticated',
        );

        expect(removeUserAddress).not.toHaveBeenCalled();
      });
    });

    describe('setDefaultBillingAddress', () => {
      it('should call `setUserDefaultBillingAddress` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultBillingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultBillingAddress(address1.id);

        expect(setUserDefaultBillingAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          address1.id,
          undefined,
        );
      });

      it('should _NOT_ call `setUserDefaultBillingAddress` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);
        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { setDefaultBillingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(() =>
          setDefaultBillingAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultBillingAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `setUserDefaultBillingAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { setDefaultBillingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(() =>
          setDefaultBillingAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultBillingAddress).not.toHaveBeenCalled();
      });
    });

    describe('setDefaultShippingAddress', () => {
      it('should call `setUserDefaultShippingAddress` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultShippingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultShippingAddress(address1.id);

        expect(setUserDefaultShippingAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          address1.id,
          undefined,
        );
      });

      it('should _NOT_ call `setUserDefaultShippingAddress` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);
        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { setDefaultShippingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(() =>
          setDefaultShippingAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `setUserDefaultShippingAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { setDefaultShippingAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(() =>
          setDefaultShippingAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultShippingAddress).not.toHaveBeenCalled();
      });
    });

    describe('setDefaultContactAddress', () => {
      it('should call `setUserDefaultContactAddress` action if the user is authenticated', async () => {
        const {
          result: {
            current: {
              actions: { setDefaultContactAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await setDefaultContactAddress(address1.id);

        expect(setUserDefaultContactAddress).toHaveBeenCalledWith(
          mockInitialState.entities.user.id,
          address1.id,
          undefined,
        );
      });

      it('should _NOT_ call `setUserDefaultContactAddress` action if the user is not set', async () => {
        const mockWithoutUserState = merge({}, mockInitialState);
        // @ts-expect-error Cannot set user to null/undefined if it exists
        mockWithoutUserState.entities.user = null;
        // @ts-expect-error Cannot set user's id to null/undefined if it exists
        mockWithoutUserState.users.id = null;

        const {
          result: {
            current: {
              actions: { setDefaultContactAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithoutUserState),
          },
        );

        await expect(() =>
          setDefaultContactAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultContactAddress).not.toHaveBeenCalled();
      });

      it('should _NOT_ call `setUserDefaultContactAddress` action if the user is guest', async () => {
        const mockWithGuestUserState = merge({}, mockInitialState);
        mockWithGuestUserState.entities.user.isGuest = true;

        const {
          result: {
            current: {
              actions: { setDefaultContactAddress },
            },
          },
        } = renderHook(
          () =>
            useUserAddresses({
              enableAutoFetch: false,
              manageDefaultsOnRemoveAddress: false,
            }),
          {
            wrapper: withStore(mockWithGuestUserState),
          },
        );

        await expect(() =>
          setDefaultContactAddress(address1.id),
        ).rejects.toThrow('User is not authenticated');

        expect(setUserDefaultContactAddress).not.toHaveBeenCalled();
      });
    });
  });
});
