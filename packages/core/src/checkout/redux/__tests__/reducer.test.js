import * as fromReducer from '../reducer';
import { getInitialState } from '../../../../tests';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('checkout reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_CHECKOUT_REQUEST,
      actionTypes.GET_CHECKOUT_REQUEST,
      actionTypes.UPDATE_CHECKOUT_REQUEST,
      actionTypes.RESET_CHECKOUT,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          {
            error: 'previous error',
          },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it('should handle CREATE_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle GET_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.GET_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle RESET_CHECKOUT action type', () => {
      const currentState = { error: true };

      expect(
        reducer(currentState, {
          type: actionTypes.RESET_CHECKOUT,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it.each([actionTypes.RESET_CHECKOUT])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(
            {
              id: 'previous id',
            },
            {
              type: actionType,
            },
          ).id,
        ).toBe(initialState.id);
      },
    );

    it('should handle CREATE_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle GET_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.GET_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle GET_CHECKOUT_DETAILS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.GET_CHECKOUT_DETAILS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_ITEM_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_ITEM_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_PROMOCODE_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_PROMOCODE_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle RESET_CHECKOUT action type', () => {
      const currentState = { id: 12121 };

      expect(
        reducer(currentState, {
          type: actionTypes.RESET_CHECKOUT,
        }).id,
      ).toBe(initialState.id);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle CREATE_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle GET_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.CREATE_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.CREATE_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.GET_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.GET_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.UPDATE_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle RESET_CHECKOUT action type', () => {
      const currentState = { isLoading: true };

      expect(
        reducer(currentState, {
          type: actionTypes.RESET_CHECKOUT,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('charges() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().charges;

      expect(state).toEqual(initialState.charges);
    });

    it('should handle POST_CHARGES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.POST_CHARGES_REQUEST,
        }).charges,
      ).toEqual({ error: initialState.charges.error, isLoading: true });
    });

    it('should handle GET_CHARGES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CHARGES_REQUEST,
        }).charges,
      ).toEqual({ error: initialState.charges.error, isLoading: true });
    });

    it('should handle POST_CHARGES_FAILURE action type', () => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionTypes.POST_CHARGES_FAILURE,
          payload: { error: mockError },
        }).charges,
      ).toEqual({ error: mockError, isLoading: false });
    });

    it('should handle GET_CHARGES_FAILURE action type', () => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CHARGES_FAILURE,
          payload: { error: mockError },
        }).charges,
      ).toEqual({ error: mockError, isLoading: false });
    });

    it('should handle POST_CHARGES_SUCCESS action type', () => {
      const mockResult = 'mocked result';
      expect(
        reducer(undefined, {
          type: actionTypes.POST_CHARGES_SUCCESS,
          payload: mockResult,
        }).charges,
      ).toEqual({
        error: initialState.charges.error,
        isLoading: false,
        result: mockResult,
      });
    });

    it('should handle GET_CHARGES_SUCCESS action type', () => {
      const mockResult = 'mocked result';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CHARGES_SUCCESS,
          payload: mockResult,
        }).charges,
      ).toEqual({
        error: initialState.charges.error,
        isLoading: false,
        result: mockResult,
      });
    });

    it('should handle RESET_CHARGES action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CHARGES,
        }).charges,
      ).toEqual(initialState.charges);
    });
  });

  describe('deliveryBundleUpgrades() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().deliveryBundleUpgrades;

      expect(state).toEqual(initialState.deliveryBundleUpgrades);
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: true,
      });
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: mockError },
        }).deliveryBundleUpgrades,
      ).toEqual({ error: mockError, isLoading: false });
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: false,
      });
    });

    it('should handle @farfetch/blackout-core/GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS action type', () => {
      const mockResult = { result: 'mocked result' };
      expect(
        reducer(undefined, {
          type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
          payload: mockResult,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: false,
        result: mockResult.result,
      });
    });
  });

  describe('entitiesMapper()', () => {
    describe('without convertCheckoutOrder', () => {
      const entities = {
        anotherProp: 123,
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: { checkout: 1 },
        },
      };
      const state = {
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: { checkout: 1 },
        },
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
      };

      const expectedResult = {
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: {
            checkout: 1,
            ...entities,
          },
        },
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
      };

      it.each([
        actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
        actionTypes.GET_COLLECTPOINTS_SUCCESS,
      ])('should handle %s action type', actionType => {
        expect(
          entitiesMapper[actionType](state, {
            meta: { id: 1 },
            payload: { entities },
            type: actionType,
          }),
        ).toEqual(expectedResult);
      });

      it(`should handle ${actionTypes.GET_CHECKOUT_DETAILS_SUCCESS}`, () => {
        const metaId = 1;
        const payload = {
          entities: {
            ...entities,
            products: {
              3: {
                id: 3,
              },
            },
          },
        };
        expect(
          entitiesMapper[actionTypes.GET_CHECKOUT_DETAILS_SUCCESS](state, {
            meta: { id: metaId },
            payload,
            type: actionTypes.GET_CHECKOUT_DETAILS_SUCCESS,
          }),
        ).toEqual({
          ...state,
          ...entities,
          products: {
            ...state.products,
            3: {
              id: 3,
            },
          },
          checkout: {
            1: {
              data: 'data',
              checkoutOrder: 1,
            },
          },
        });
      });

      it(`should handle ${actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundles: {
            12345678: {
              id: 12345678,
            },
          },
        };
        expect(
          entitiesMapper[actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS](
            mockState,
            {
              meta: { deliveryBundleId: 12345678 },
              payload: {
                entities: {
                  itemDeliveryProvisioning: {
                    123: {
                      itemId: 123,
                    },
                    321: {
                      itemId: 321,
                    },
                  },
                },
                result: [123, 321],
              },
              type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS,
            },
          ),
        ).toEqual({
          ...state,
          deliveryBundles: {
            12345678: {
              id: 12345678,
              itemDeliveryProvisioning: {
                123: {
                  itemId: 123,
                },
                321: {
                  itemId: 321,
                },
              },
              itemsIds: [123, 321],
            },
          },
        });
      });

      it(`should handle ${actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundleUpgrades: {
            123: {
              1234: {
                Estimated: [
                  {
                    id: 1100,
                    itemId: 1234,
                    name: 'Fast',
                  },
                ],
              },
              4321: {
                Estimated: [
                  {
                    id: 1102,
                    itemId: 4321,
                    name: 'Fast',
                  },
                ],
              },
            },
          },
        };
        expect(
          entitiesMapper[
            actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS
          ](mockState, {
            meta: { deliveryBundleId: 123, upgradeId: 5555 },
            payload: {
              entities: {
                itemDeliveryProvisioning: {
                  1234: {
                    itemId: 1234,
                    provisioning: {
                      merchantId: 1,
                      quantity: 3,
                      deliveryDateEstimate: '2020-04-01T15:41:53.776Z',
                    },
                  },
                  4321: {
                    itemId: 4321,
                    provisioning: {
                      merchantId: 2,
                      quantity: 3,
                      deliveryDateEstimate: '2020-04-03T15:41:53.776Z',
                    },
                  },
                },
              },
              result: [1234, 4321],
            },
            type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
          }),
        ).toEqual({
          ...state,
          deliveryBundleUpgrades: {
            123: {
              1234: {
                Estimated: [
                  {
                    id: 1100,
                    itemId: 1234,
                    name: 'Fast',
                  },
                ],
                provisioning: {
                  merchantId: 1,
                  quantity: 3,
                  deliveryDateEstimate: '2020-04-01T15:41:53.776Z',
                  upgradeId: 5555,
                },
              },
              4321: {
                Estimated: [
                  {
                    id: 1102,
                    itemId: 4321,
                    name: 'Fast',
                  },
                ],
                provisioning: {
                  merchantId: 2,
                  quantity: 3,
                  deliveryDateEstimate: '2020-04-03T15:41:53.776Z',
                  upgradeId: 5555,
                },
              },
            },
          },
        });
      });
    });

    describe('with convertCheckoutOrder', () => {
      const result = {
        checkoutOrders: {
          1: {
            checkout: 123,
            tags: ['NEW_GIFT'],
          },
        },
      };
      const state = {
        checkoutOrders: {
          1: {
            checkout: 123,
            tags: ['GIFT'],
          },
        },
      };

      it.each([
        actionTypes.CREATE_CHECKOUT_SUCCESS,
        actionTypes.SET_PROMOCODE_SUCCESS,
        actionTypes.GET_CHECKOUT_SUCCESS,
        actionTypes.SET_ITEM_TAGS_SUCCESS,
        actionTypes.UPDATE_CHECKOUT_SUCCESS,
        actionTypes.SET_TAGS_SUCCESS,
      ])('should handle %s action type', actionType => {
        expect(
          entitiesMapper[actionType](state, {
            meta: { id: 1 },
            payload: { entities: result },
            type: actionType,
          }),
        ).toEqual(result);
      });

      it(`should replace entity checkout child array after ${actionTypes.UPDATE_CHECKOUT_SUCCESS}`, () => {
        const state = {
          checkout: {
            1: {
              shippingOptions: [
                { id: 1, price: 39 },
                { id: 2, price: 40 },
              ],
              paymentMethods: {
                customerAccounts: [{ id: 111 }, { id: 222 }],
              },
            },
          },
        };
        const payload = {
          entities: {
            checkout: {
              1: {
                shippingOptions: [{ id: 3, price: 20 }],
                paymentMethods: {
                  customerAccounts: [{ id: 111 }],
                },
              },
            },
          },
          result: 1,
        };
        const expected = payload.entities;

        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_SUCCESS](state, {
            payload,
            type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
          }),
        ).toEqual(expected);
      });
    });

    describe('reset checkout', () => {
      it(`should handle ${actionTypes.RESET_CHECKOUT} action type`, () => {
        const state = {
          checkout: {
            1: { data: 'checkout' },
          },
          checkoutDetails: {
            1: { data: 'checkout details' },
          },
          checkoutOrders: {
            1: { data: 'checkout order' },
          },
          checkoutOrderItems: {
            1: { data: 'checkout order item' },
          },
          checkoutOrderItemProducts: {
            1: { data: 'checkout order item products' },
          },
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        const expectedResult = {
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        expect(entitiesMapper[actionTypes.RESET_CHECKOUT](state)).toEqual(
          expectedResult,
        );
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 123;

      expect(fromReducer.getId({ id })).toBe(id);
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

  describe('Sub-areas', () => {
    const subAreaResult = {
      error: null,
      isLoading: false,
    };

    const subAreas = {
      completePaymentCheckout: { ...subAreaResult },
      checkoutDetails: { ...subAreaResult },
      collectPoints: { ...subAreaResult },
      itemTags: { ...subAreaResult },
      promoCode: { ...subAreaResult },
      tags: { ...subAreaResult },
      giftMessage: { ...subAreaResult },
      charges: { ...subAreaResult },
      deliveryBundleUpgrades: { ...subAreaResult },
      itemDeliveryProvisioning: { ...subAreaResult },
      upgradeItemDeliveryProvisioning: { ...subAreaResult },
      operations: { ...subAreaResult },
      operation: { ...subAreaResult },
      orderItem: { ...subAreaResult },
    };

    const subAreaNames = [
      'CompletePaymentCheckout',
      'CheckoutDetails',
      'CollectPoints',
      'ItemTags',
      'PromoCode',
      'Tags',
      'GiftMessage',
      'Charges',
      'DeliveryBundleUpgrades',
      'ItemDeliveryProvisioning',
      'UpgradeItemDeliveryProvisioning',
      'Operations',
      'Operation',
      'OrderItem',
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
