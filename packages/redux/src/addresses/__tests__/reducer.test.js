import * as fromReducer from '../reducer';
import { getInitialState } from '../../../tests';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import reducer, { actionTypes, entitiesMapper } from '..';
let initialState;

describe('Addresses reducers', () => {
  const addressId2 = '2222222';

  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('reset handling', () => {
    it('RESET_ADDRESSES should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_ADDRESSES,
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

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().result;

      expect(state).toBe(initialState.result);
      expect(state).toBeNull();
    });

    it('should handle FETCH_ADDRESSES_SUCCESS action type', () => {
      const expectedResult = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { result: expectedResult },
        type: actionTypes.FETCH_ADDRESSES_SUCCESS,
      });

      expect(reducerResult.result).toBe(expectedResult);
    });

    it('should handle CREATE_ADDRESS_SUCCESS action type', () => {
      const state = { result: ['1', '2', '3'] };
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
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
      });

      expect(reducerResult.result).toEqual(expectedState);
    });

    it('should handle REMOVE_ADDRESS_SUCCESS action type', () => {
      const state = { result: ['1', '2', '3'] };
      const addressIdToRemove = '2';
      const expectedState = ['1', '3'];

      const reducerResult = reducer(state, {
        meta: { addressId: addressIdToRemove },
        type: actionTypes.REMOVE_ADDRESS_SUCCESS,
      });

      expect(reducerResult.result).toEqual(expectedState);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { result: 'foo' };

      expect(reducer(state).result).toBe(state.result);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.FETCH_PREDICTION_FAILURE,
      actionTypes.FETCH_PREDICTION_DETAILS_FAILURE,
      actionTypes.FETCH_ADDRESSES_FAILURE,
      actionTypes.CREATE_ADDRESS_FAILURE,
      actionTypes.UPDATE_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
        meta: { addressId: addressId2 },
      });

      expect(reducerResult.error).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_PREDICTION_REQUEST,
      actionTypes.FETCH_PREDICTION_DETAILS_REQUEST,
      actionTypes.FETCH_ADDRESSES_REQUEST,
      actionTypes.FETCH_ADDRESS_REQUEST,
      actionTypes.CREATE_ADDRESS_REQUEST,
      actionTypes.UPDATE_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
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
      actionTypes.FETCH_ADDRESSES_SUCCESS,
      actionTypes.FETCH_ADDRESS_SUCCESS,
      actionTypes.UPDATE_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
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
      actionTypes.FETCH_ADDRESSES_FAILURE,
      actionTypes.FETCH_ADDRESS_FAILURE,
      actionTypes.CREATE_ADDRESS_FAILURE,
      actionTypes.UPDATE_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
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
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('predictions() reducer', () => {
    it.each([actionTypes.FETCH_PREDICTION_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(reducer(undefined, { type: actionType }).predictions).toEqual({
          error: initialState.predictions.error,
          isLoading: true,
        });
      },
    );

    it.each([actionTypes.FETCH_PREDICTION_FAILURE])(
      'should handle %s action type',
      actionType => {
        const error = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error },
          type: actionType,
        }).predictions;
        const expectedResult = {
          error,
          isLoading: false,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );

    it.each([actionTypes.FETCH_PREDICTION_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const payload = 'foo';
        const reducerResult = reducer(undefined, {
          payload,
          type: actionType,
        }).predictions;
        const expectedResult = {
          error: initialState.predictions.error,
          isLoading: false,
          result: payload,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );

    it.each([actionTypes.RESET_PREDICTION])(
      'should handle %s action type',
      actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).predictions;

        expect(reducerResult).toEqual(initialState.predictions);
      },
    );
  });

  describe('entitiesMapper()', () => {
    describe('create an address', () => {
      const state = {
        addresses: {
          1: { id: 1, address: 'data' },
          2: { id: 2, address: 'data' },
        },
      };

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

      it('should handle CREATE_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.CREATE_ADDRESS_SUCCESS](state, {
            payload: {
              result: newAddress.id,
              entities: {
                addresses: {
                  ...newAddressResultEntity,
                },
              },
            },
            type: actionTypes.CREATE_ADDRESS_SUCCESS,
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

      it('should handle UPDATE_ADDRESS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.UPDATE_ADDRESS_SUCCESS](state, {
            payload: {
              result: updatedAddress.id,
              entities: {
                addresses: {
                  ...updatedAddressResultEntity,
                },
              },
            },
            type: actionTypes.UPDATE_ADDRESS_SUCCESS,
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
          entitiesMapper[actionTypes.REMOVE_ADDRESS_SUCCESS](state, {
            meta: { addressId: 1 },
            type: actionTypes.REMOVE_ADDRESS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default shipping address', () => {
      it('should handle SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - With a previous default address', () => {
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
          entitiesMapper[actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
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
          entitiesMapper[actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default billing address', () => {
      it('should handle SET_DEFAULT_BILLING_ADDRESS_SUCCESS action type - With a previous default address', () => {
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
          entitiesMapper[actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle SET_DEFAULT_BILLING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
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
          entitiesMapper[actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('get an address schema', () => {
      // Existent schemas
      const state = {
        addressSchema: {
          1: {
            addressSchemaLines: [
              {
                name: 'FirstName',
                position: 0,
                type: 'FreeText',
                validationRegex: '^.{1,45}$',
                apiMapping: 'FirstName',
                isMandatory: true,
                maxLength: 45,
                minLength: 1,
                column: 0,
                row: 0,
              },
            ],
          },
        },
      };

      // Obtained schema not yet stored
      const schema = {
        addressSchemaLines: [
          {
            name: 'LastName',
            position: 0,
            type: 'FreeText',
            validationRegex: '^.{1,45}$',
            apiMapping: 'LastName',
            isMandatory: true,
            maxLength: 45,
            minLength: 1,
            column: 1,
            row: 0,
          },
          {
            name: 'StreetLine1',
            position: 1,
            type: 'FreeText',
            validationRegex: '^.{1,250}$',
            apiMapping: 'AddressLine1',
            isMandatory: true,
            maxLength: 250,
            minLength: 1,
            column: 0,
            row: 1,
          },
        ],
      };

      // Should add the new schema to the list
      const countryId = 2;
      const newAddressSchema = {
        [countryId]: { ...schema },
      };

      const expectedResult = {
        addressSchema: {
          ...state.addressSchema,
          ...newAddressSchema,
        },
      };

      it('should handle FETCH_ADDRESS_SCHEMA_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS](state, {
            payload: {
              result: countryId,
              entities: {
                addressSchema: {
                  ...newAddressSchema,
                },
              },
            },
            type: actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('Set default contact address', () => {
      it('should handle SET_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - With a previous default address', () => {
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
          entitiesMapper[actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
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
          entitiesMapper[actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('Delete default contact address', () => {
      it('should handle REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS action type', () => {
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
          entitiesMapper[actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS](
            state,
            {
              meta: { addressId: 1 },
              type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            },
          ),
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

        expect(
          entitiesMapper[LOGOUT_SUCCESS](state, { type: LOGOUT_SUCCESS }),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('address() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().address;

      expect(state).toEqual(initialState.address);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    // Error and loading status on REQUEST for address details
    it.each([actionTypes.CREATE_ADDRESS_REQUEST])(
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
      actionTypes.FETCH_ADDRESS_REQUEST,
      actionTypes.REMOVE_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
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
      actionTypes.FETCH_ADDRESS_FAILURE,
      actionTypes.REMOVE_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
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
      actionTypes.FETCH_ADDRESS_SUCCESS,
      actionTypes.REMOVE_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { addressId: addressId2 },
          type: actionType,
        }).address,
      ).toEqual({ error: {}, isLoading: { [addressId2]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { address: { isLoading: { foo: false } } };

      expect(reducer(state).address).toEqual(state.address);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const result = { foo: true };

      expect(fromReducer.getResult({ result })).toBe(result);
    });
  });

  describe('getPredictions() selector', () => {
    it('should return the `predictions` property from a given state', () => {
      const predictions = { foo: true };

      expect(fromReducer.getPredictions({ predictions })).toBe(predictions);
    });
  });

  describe('getPredictionDetails() selector', () => {
    it('should return the `predictionDetails` property from a given state', () => {
      const predictionDetails = { foo: true };

      expect(fromReducer.getPredictionDetails({ predictionDetails })).toBe(
        predictionDetails,
      );
    });
  });

  describe('getAddresses() selector', () => {
    it('should return the `addresses` property from a given state', () => {
      const addresses = { foo: true };

      expect(fromReducer.getAddresses({ addresses })).toBe(addresses);
    });
  });

  describe('getAddress() selector', () => {
    it('should return the `address` property from a given state', () => {
      const address = { foo: true };

      expect(fromReducer.getAddress({ address })).toBe(address);
    });
  });

  describe('getAddressSchema() selector', () => {
    it('should return the `addressSchema` property from a given state', () => {
      const addressSchema = { foo: true };

      expect(fromReducer.getAddressSchema({ addressSchema })).toBe(
        addressSchema,
      );
    });
  });

  describe('getDefaultAddressDetails() selector', () => {
    it('should return the `defaultAddressDetails` property from a given state', () => {
      const defaultAddressDetails = { foo: true };

      expect(
        fromReducer.getDefaultAddressDetails({ defaultAddressDetails }),
      ).toBe(defaultAddressDetails);
    });
  });

  describe('Sub-areas', () => {
    const subAreaResult = {
      result: null,
      error: {},
      isLoading: {},
    };

    const subAreas = {
      predictions: { ...subAreaResult },
      predictionDetails: { ...subAreaResult },
      addresses: { ...subAreaResult },
      address: { ...subAreaResult },
      addressSchema: { ...subAreaResult },
    };

    const subAreaNames = [
      'Predictions',
      'PredictionDetails',
      'Addresses',
      'Address',
      'AddressSchema',
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}`]: reducerSelector } = fromReducer;
        expect(reducerSelector(subAreas)).toEqual(subAreaResult);
      },
    );
  });
});
