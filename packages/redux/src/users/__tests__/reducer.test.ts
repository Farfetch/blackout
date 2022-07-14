import * as fromReducer from '../reducer';
import { address1 } from 'tests/__fixtures__/users';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/src/authentication/actionTypes';
import reducer, { actionTypes, entitiesMapper } from '..';
import type { State } from '../types';

let initialState: State;
const randomAction = { type: 'this_is_a_random_action' };

describe('users redux reducer', () => {
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

    it('LOGOUT_SUCCESS should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: LOGOUT_SUCCESS,
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
      };

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

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
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

    it('should handle FETCH_USER_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_GUEST_USER_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_GUEST_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_GUEST_USER_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_GUEST_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_USER_ATTRIBUTES_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_USER_ATTRIBUTES_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle SET_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = new Error();

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
    });

    it('should handle FETCH_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_GUEST_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_GUEST_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
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
      const state = { ...initialState, result: { bar: 'foo' } };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
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

    it('should handle FETCH_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.UPDATE_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_GUEST_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_GUEST_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_GUEST_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.CREATE_GUEST_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_GUEST_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_GUEST_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_GUEST_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_GUEST_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_GUEST_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_GUEST_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_GUEST_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_GUEST_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_ATTRIBUTES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTES_SUCCESS action type', () => {
      const payload = [
        {
          id: '',
          type: '',
          channelCode: '',
          tenantId: 0,
          userId: 0,
          details: {
            referralToken: '',
            rewardsCardNumber: '',
            joinRewards: false,
          },
        },
      ];

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
          payload,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_USER_ATTRIBUTES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_USER_ATTRIBUTES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_USER_ATTRIBUTES_SUCCESS action type', () => {
      const payload = {
        id: '',
        type: '',
        channelCode: '',
        tenantId: 0,
        userId: 0,
        details: {
          referralToken: '',
          rewardsCardNumber: '',
          joinRewards: false,
        },
      };
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
          payload,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTE_SUCCESS action type', () => {
      const payload = {
        id: '',
        type: '',
        channelCode: '',
        tenantId: 0,
        userId: 0,
        details: {
          referralToken: '',
          rewardsCardNumber: '',
          joinRewards: false,
        },
      };
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
          payload,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle SET_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.SET_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle SET_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle SET_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
          payload: 0,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
          payload: 0,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
          payload: 0,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: true };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
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
      const state = { ...initialState, address: { isLoading: { foo: false } } };

      expect(reducer(state, randomAction).address).toEqual(state.address);
    });
  });

  describe('entitiesMapper()', () => {
    const state = {
      test: 'test',
      user: {
        id: 1213123,
        name: 'teste',
      },
    };

    it('should handle FETCH_USER_BENEFITS_SUCCESS action type', () => {
      const idBenefit1 = 1111;
      const benefitsEntity = {
        [idBenefit1]: {
          id: idBenefit1,
          code: 'SummerParty2017',
          isActive: true,
          metadata: {
            'dress-code': 'green',
          },
          benefitType: 'price',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, benefits: [idBenefit1] },
        benefits: { ...benefitsEntity },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_USER_BENEFITS_SUCCESS](state, {
          payload: {
            result: [idBenefit1],
            entities: {
              benefits: { ...benefitsEntity },
            },
          },
          type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    describe('FETCH_USER_PREFERENCES_SUCCESS', () => {
      it('should handle FETCH_USER_PREFERENCES_SUCCESS action type when _NO_ preferences are available on the server', () => {
        const expectedResult = {
          ...state,
          user: { ...state.user, preferences: [] },
          preferences: {},
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_PREFERENCES_SUCCESS](state, {
            payload: {
              result: [],
              entities: {},
            },
            type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle FETCH_USER_PREFERENCES_SUCCESS action type when preferences are available on the server', () => {
        const codePreference = 'code1';
        const preferencesEntity = {
          [codePreference]: {
            code: codePreference,
            values: ['136968', '136831', '136908'],
            groupId: 'mobile',
            updatedDate: '2019-08-19T10:46:59.543Z',
          },
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, preferences: [codePreference] },
          preferences: { ...preferencesEntity },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_PREFERENCES_SUCCESS](state, {
            payload: {
              result: [codePreference],
              entities: {
                preferences: { ...preferencesEntity },
              },
            },
            type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    it('should handle FETCH_USER_CREDIT_SUCCESS action type', () => {
      const credit = {
        currency: 'GB',
        value: 50,
        formattedValue: '£50',
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, credit },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_USER_CREDIT_SUCCESS](state, {
          payload: {
            credit,
          },
          type: actionTypes.FETCH_USER_CREDIT_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_USER_CREDIT_MOVEMENTS_SUCCESS action type', () => {
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

      const expectedResult = {
        ...state,
        user: { ...state.user, creditMovements },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS](state, {
          payload: {
            creditMovements,
          },
          type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_USER_CONTACTS_SUCCESS action type', () => {
      const idContact1 = 'contact1';
      const contactsEntity = {
        [idContact1]: {
          id: idContact1,
          value: 'TEST',
          countryDetails: {
            countryCode: 'PT',
            countryCallingCode: '351',
          },
          type: 'Phone',
          description: 'TEST',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, contacts: [idContact1] },
        contacts: { ...contactsEntity },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_USER_CONTACTS_SUCCESS](state, {
          payload: {
            result: [idContact1],
            entities: {
              contacts: { ...contactsEntity },
            },
          },
          type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle UPDATE_USER_PREFERENCES_SUCCESS action type', () => {
      const codePreference = 'code1Updated';
      const preferencesEntity = {
        [codePreference]: {
          code: codePreference,
          values: ['136968', '136831', '136908'],
          groupId: 'mobile',
          updatedDate: '2019-08-19T10:46:59.543Z',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, preferences: [codePreference] },
        preferences: { ...preferencesEntity },
      };

      expect(
        entitiesMapper[actionTypes.UPDATE_USER_PREFERENCES_SUCCESS](state, {
          payload: {
            result: [codePreference],
            entities: {
              preferences: { ...preferencesEntity },
            },
          },
          type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    describe('create an address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data' },
          2: { id: 2, address: 'data' },
        },
      };

      const newAddress = address1;
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
            meta: { addressId: '1' },
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('update an address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data', zipCode: '1111', otherprop: 'prop' },
        },
      };

      const updatedAddress = address1;
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
            meta: { addressId: '1' },
          }),
        ).toStrictEqual(expectedResult);
      });
    });

    describe('Delete adressbook address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data' },
          2: { id: 2, address: 'data' },
        },
      };

      const expectedResult = {
        addresses: {
          2: { id: 2, address: 'data' },
        },
      };

      it('should handle REMOVE_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_USER_ADDRESS_SUCCESS](state, {
            meta: { addressId: '1' },
            type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default shipping address', () => {
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
        };

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
              meta: { addressId: '1' },
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
        };

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
              meta: { addressId: '1' },
              type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default billing address', () => {
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
        };

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
              meta: { addressId: '1' },
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
        };

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
              meta: { addressId: '1' },
              type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default contact address', () => {
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
        };

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
              meta: { addressId: '1' },
              type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - Without a previous default address', () => {
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
        };

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
              meta: { addressId: '1' },
              type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('Delete default contact address', () => {
      it('should handle REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: true,
            },
          },
        };

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
            meta: { addressId: '1', userId: 1 },
            type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('Logout success', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const state = {
          addresses: {
            1: {
              id: 1,
              address: 'data',
              isCurrentPreferred: true,
            },
          },
          checkout: {},
        };

        // Should unmark the previous default as the default address
        const expectedResult = {
          checkout: {},
        };

        expect(entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(expectedResult);
      });
    });
  });

  describe('getAddresses() selector', () => {
    it('should return the `addresses` property from a given state', () => {
      const addresses = { error: null, isLoading: false, result: null };

      expect(fromReducer.getUserAddresses({ ...initialState, addresses })).toBe(
        addresses,
      );
    });
  });

  describe('getAddress() selector', () => {
    it('should return the `address` property from a given state', () => {
      const address = { error: {}, isLoading: {} };

      expect(fromReducer.getUserAddress({ ...initialState, address })).toBe(
        address,
      );
    });
  });

  describe('getDefaultAddress() selector', () => {
    it('should return the `defaultAddressDetails` property from a given state', () => {
      const defaultAddress = { error: null, isLoading: false, result: null };

      expect(
        fromReducer.getUserDefaultAddressDetails({
          ...initialState,
          defaultAddress,
        }),
      ).toBe(defaultAddress);
    });
  });
});
