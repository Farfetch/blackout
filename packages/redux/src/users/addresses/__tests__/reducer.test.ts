import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper } from '../reducer';
import type { AddressesEntity } from '../../../entities/types';
import type { StoreState } from '../../../types/storeState.types';
import type { UserAddressesState } from '../types';

let initialState: UserAddressesState;

describe('addresses reducers', () => {
  const addressId2 = '2222222';

  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('RESET_USER_ADDRESSES should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_USER_ADDRESSES,
        }),
      ).toEqual(initialState);
    });
  });

  describe('getDefaultAddress() function', () => {
    it('should return the default shipping and billing addresses given a list of addresses', () => {
      const defaultShippingAddress = {
        id: 1,
        name: 'address1',
        isCurrentShipping: true,
        isCurrentBilling: false,
      };

      const defaultBillingAddress = {
        id: 2,
        name: 'address2',
        isCurrentShipping: false,
        isCurrentBilling: true,
      };

      const addressesList = {
        [defaultShippingAddress.id]: {
          ...defaultShippingAddress,
        },
        [defaultBillingAddress.id]: {
          ...defaultBillingAddress,
        },
      } as unknown as AddressesEntity;

      const resultDefaultShippingAddress = fromReducer.getDefaultAddress(
        addressesList,
        'isCurrentShipping',
      );
      expect(resultDefaultShippingAddress).toEqual(defaultShippingAddress);

      const resultDefaultBillingAddress = fromReducer.getDefaultAddress(
        addressesList,
        'isCurrentBilling',
      );
      expect(resultDefaultBillingAddress).toEqual(defaultBillingAddress);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).result;

      expect(newState).toBe(initialState.result);
      expect(newState).toBeNull();
    });

    it('should handle FETCH_USER_ADDRESSES_SUCCESS action type', () => {
      const expectedResult = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { result: expectedResult },
        type: actionTypes.FETCH_USER_ADDRESSES_SUCCESS,
      });

      expect(reducerResult.result).toBe(expectedResult);
    });

    it('should handle CREATE_USER_ADDRESS_SUCCESS action type', () => {
      const state = { ...initialState, result: ['1', '2', '3'] };
      const newAddressId = '4';
      const expectedState = [...state.result, newAddressId];

      const reducerResult = reducer(state, {
        meta: { addressId: newAddressId },
        payload: {
          result: newAddressId,
          entities: {
            addresses: {
              [newAddressId]: { id: newAddressId },
            },
          },
        },
        type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
      });

      expect(reducerResult.result).toEqual(expectedState);
    });

    it('should handle REMOVE_USER_ADDRESS_SUCCESS action type', () => {
      const state = { ...initialState, result: ['1', '2', '3'] };
      const addressIdToRemove = '2';
      const expectedState = ['1', '3'];

      const reducerResult = reducer(state, {
        meta: { addressId: addressIdToRemove },
        type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      });

      expect(reducerResult.result).toEqual(expectedState);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        result: 'foo',
      } as unknown as UserAddressesState;

      const randomActionWithResult = {
        type: 'random',
        result: { id: '222' },
      };

      expect(reducer(state, randomActionWithResult).result).toBe(state.result);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, { type: 'INIT' }).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    // Error value on FAILURE
    it.each([
      actionTypes.FETCH_USER_ADDRESS_FAILURE,
      actionTypes.FETCH_USER_ADDRESSES_FAILURE,
      actionTypes.CREATE_USER_ADDRESS_FAILURE,
      actionTypes.UPDATE_USER_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
        meta: { addressId: addressId2 },
      });

      expect(reducerResult.error).toBe(error);
    });

    // Error value on REQUEST
    it.each([
      actionTypes.FETCH_USER_ADDRESS_REQUEST,
      actionTypes.FETCH_USER_ADDRESSES_REQUEST,
      actionTypes.CREATE_USER_ADDRESS_REQUEST,
      actionTypes.UPDATE_USER_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
    ])('should handle %s action type', actionType => {
      const previousState = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      };
      const reducerResult = reducer(previousState, {
        type: actionType,
        meta: { addressId: addressId2 },
      });

      expect(reducerResult.error).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: 'foo',
      } as unknown as UserAddressesState;

      const randomActionWithError = {
        type: 'random',
        payload: { error: new Error('dummy error') },
      };

      expect(reducer(state, randomActionWithError).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).isLoading;

      expect(newState).toBe(initialState.isLoading);
      expect(newState).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_USER_ADDRESSES_REQUEST,
      actionTypes.FETCH_USER_ADDRESS_REQUEST,
      actionTypes.CREATE_USER_ADDRESS_REQUEST,
      actionTypes.UPDATE_USER_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { addressId: addressId2 },
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    // Loading status on SUCCESS
    it.each([
      actionTypes.FETCH_USER_ADDRESSES_SUCCESS,
      actionTypes.FETCH_USER_ADDRESS_SUCCESS,
      actionTypes.CREATE_USER_ADDRESS_SUCCESS,
      actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
          meta: { addressId: addressId2 },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    // Loading status on FAILURE
    it.each([
      actionTypes.FETCH_USER_ADDRESSES_FAILURE,
      actionTypes.FETCH_USER_ADDRESS_FAILURE,
      actionTypes.CREATE_USER_ADDRESS_FAILURE,
      actionTypes.UPDATE_USER_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
          meta: { addressId: addressId2 },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: 'foo',
      } as unknown as UserAddressesState;

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    describe('create an address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data' },
          2: { id: 2, address: 'data' },
        },
      } as unknown as NonNullable<StoreState['entities']>;

      const newAddress = { id: 3, address: 'data' };
      const newAddressResultEntity = {
        [newAddress.id]: { ...newAddress },
      };
      const expectedResult = {
        addresses: {
          ...state.addresses,
          ...newAddressResultEntity,
        },
      };

      it('should handle CREATE_USER_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.CREATE_USER_ADDRESS_SUCCESS](state, {
            payload: {
              result: newAddress.id,
              entities: {
                addresses: {
                  ...newAddressResultEntity,
                },
              },
            },
            type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('update an address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data', zipCode: '1111', otherprop: 'prop' },
        },
      } as unknown as NonNullable<StoreState['entities']>;

      const updatedAddress = { id: 1, address: 'updated address data' };
      const updatedAddressResultEntity = {
        [updatedAddress.id]: { ...updatedAddress },
      };
      const expectedResult = {
        addresses: {
          ...state.addresses,
          ...updatedAddressResultEntity,
        },
      };

      it('should handle UPDATE_USER_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.UPDATE_USER_ADDRESS_SUCCESS](state, {
            payload: {
              result: updatedAddress.id,
              entities: {
                addresses: {
                  ...updatedAddressResultEntity,
                },
              },
            },
            type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
          }),
        ).toStrictEqual(expectedResult);
      });
    });

    describe('delete adressbook address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data' },
          2: { id: 2, address: 'data' },
        },
      } as unknown as NonNullable<StoreState['entities']>;

      const expectedResult = {
        addresses: {
          2: { id: 2, address: 'data' },
        },
      };

      it('should handle REMOVE_USER_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_USER_ADDRESS_SUCCESS](state, {
            meta: { addressId: 1 },
            type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('set default shipping address', () => {
      it('should handle SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - With a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentShipping: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentShipping: true,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should unmark the previous default as the default address
        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentShipping: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentShipping: false,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentShipping: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentShipping: false,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentShipping: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentShipping: false,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('set default billing address', () => {
      it('should handle SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS action type - With a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentBilling: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentBilling: true,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should unmark the previous default as the default address
        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentBilling: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentBilling: false,
            },
          },
        };
        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentBilling: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentBilling: false,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentBilling: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentBilling: false,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('set default contact address', () => {
      it('should handle SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - With a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentPreferred: true,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should unmark the previous default as the default address
        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentPreferred: false,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - Without a previous default address', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: false,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentPreferred: false,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should mark the selected address as the default
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: true,
            },
            2: {
              id: 2,
              address: 'data',
              isCurrentPreferred: false,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('delete default contact address', () => {
      it('should handle REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: true,
            },
          },
        } as unknown as NonNullable<StoreState['entities']>;

        // Should unmark the previous default as the default address
        const expectedResult = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: false,
            },
          },
        };

        expect(
          entitiesMapper[
            actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS
          ](state, {
            meta: { addressId: 1, userId: '1' },
            type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('address() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.address;

      expect(state).toEqual(initialState.address);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    // Error and loading status on REQUEST for address details
    it.each([actionTypes.CREATE_USER_ADDRESS_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
          }).address,
        ).toEqual({
          error: {},
          isLoading: {},
        });
      },
    );

    it.each([
      actionTypes.FETCH_USER_ADDRESS_REQUEST,
      actionTypes.REMOVE_USER_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { addressId: addressId2 },
          type: actionType,
        }).address,
      ).toEqual({
        error: {},
        isLoading: { [addressId2]: true },
      });
    });
    // Error and loading status on FAILURE for address details

    it.each([
      actionTypes.FETCH_USER_ADDRESS_FAILURE,
      actionTypes.REMOVE_USER_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { addressId: addressId2 },
          type: actionType,
          payload: { error: '' },
        }).address,
      ).toEqual({
        error: { [addressId2]: '' },
        isLoading: { [addressId2]: false },
      });
    });

    // Error and loading status on SUCCESS for address details
    it.each([
      actionTypes.FETCH_USER_ADDRESS_SUCCESS,
      actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { addressId: addressId2 },
          type: actionType,
        }).address,
      ).toEqual({ error: {}, isLoading: { [addressId2]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        address: { isLoading: { foo: false } },
      } as unknown as NonNullable<UserAddressesState>;

      const randomAction = {
        type: 'randomAction',
      };

      expect(reducer(state, randomAction).address).toEqual(state.address);
    });
  });

  describe('addresses() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.addresses;

      expect(state).toEqual(initialState.addresses);
      expect(state).toEqual({ error: null, isLoading: false });
    });

    // Error and loading status on REQUEST for addresses
    it.each([actionTypes.FETCH_USER_ADDRESSES_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            meta: { addressId: addressId2 },
            type: actionType,
          }).addresses,
        ).toEqual({
          error: null,
          isLoading: true,
        });
      },
    );

    // Error and loading status on FAILURE for addresses
    it.each([actionTypes.FETCH_USER_ADDRESSES_FAILURE])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            meta: { addressId: addressId2 },
            type: actionType,
            payload: { error: '' },
          }).addresses,
        ).toEqual({
          error: '',
          isLoading: false,
        });
      },
    );

    // Error and loading status on SUCCESS for addresses
    it.each([actionTypes.FETCH_USER_ADDRESSES_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            payload: { result: 'foo' },
            meta: { addressId: addressId2 },
            type: actionType,
          }).addresses,
        ).toEqual({ error: null, isLoading: false });
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        addresses: { isLoading: false },
      } as unknown as NonNullable<UserAddressesState>;

      const randomAction = {
        type: 'randomAction',
      };

      expect(reducer(state, randomAction).addresses).toEqual(state.addresses);
    });
  });

  describe('defaultAddressDetails() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.defaultAddressDetails;

      expect(state).toEqual(initialState.defaultAddressDetails);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    // Error and loading status on REQUEST for default address details
    it.each([actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            meta: { addressId: addressId2 },
            type: actionType,
          }).defaultAddressDetails,
        ).toEqual({
          error: null,
          isLoading: true,
        });
      },
    );

    // Error and loading status on FAILURE for default address details
    it.each([actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            meta: { addressId: addressId2 },
            type: actionType,
            payload: { error: '' },
          }).defaultAddressDetails,
        ).toEqual({
          error: '',
          isLoading: false,
        });
      },
    );

    // Error and loading status on SUCCESS for default address details
    it.each([actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            meta: { addressId: addressId2 },
            type: actionType,
          }).defaultAddressDetails,
        ).toEqual({ error: null, isLoading: false });
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        defaultAddressDetails: { isLoading: false },
      } as unknown as NonNullable<UserAddressesState>;

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).defaultAddressDetails).toEqual(
        state.defaultAddressDetails,
      );
    });
  });
});
