import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import {
  expectedNormalizedPayload,
  expectedOrderDetailsNormalizedPayload,
  expectedOrderReturnOptionsNormalizedPayload,
  expectedTrackingNormalizedPayload,
  merchantId,
  merchantId2,
  orderId,
  orderItemId,
} from 'tests/__fixtures__/orders';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import reducer, { entitiesMapper } from '../reducer';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('orders reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.FETCH_ORDERS_REQUEST,
      actionTypes.FETCH_TRACKINGS_REQUEST,
      actionTypes.RESET_ORDERS,
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

    it.each([
      actionTypes.FETCH_ORDERS_FAILURE,
      actionTypes.FETCH_TRACKINGS_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
        }).error,
      ).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.FETCH_ORDERS_REQUEST,
      actionTypes.FETCH_TRACKINGS_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.FETCH_ORDERS_SUCCESS,
      actionTypes.FETCH_TRACKINGS_SUCCESS,
      actionTypes.RESET_ORDERS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.FETCH_ORDERS_FAILURE,
      actionTypes.FETCH_TRACKINGS_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('orderDetails() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderDetails;

      expect(state).toEqual(initialState.orderDetails);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_ORDER_DETAILS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_DETAILS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
          payload: { error: '' },
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: '' },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_DETAILS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
        }).orderDetails,
      ).toEqual({ error: {}, isLoading: { [orderId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { orderDetails: { isLoading: { foo: false } } };

      expect(reducer(state, randomAction).orderDetails).toEqual(
        state.orderDetails,
      );
    });
  });

  describe('orderReturnOptions() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderReturnOptions;

      expect(state).toEqual(initialState.orderReturnOptions);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
          payload: { error: '' },
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: '' },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
        }).orderReturnOptions,
      ).toEqual({ error: {}, isLoading: { [orderId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { orderReturnOptions: { isLoading: { foo: false } } };

      expect(reducer(state, randomAction).orderReturnOptions).toEqual(
        state.orderReturnOptions,
      );
    });
  });

  describe('entitiesMapper()', () => {
    const { byMerchant, ...orderEntityDetails } =
      expectedNormalizedPayload.entities.orders[orderId];
    const orderEntity = {
      ...orderEntityDetails,
      byMerchant: {
        [merchantId]: {
          ...byMerchant[merchantId],
        },
      },
    };

    describe('for FETCH_ORDERS_SUCCESS', () => {
      const normalizedResult = {
        orders: {
          [orderId]: {
            anotherProp: 123,
            ...orderEntityDetails,
            byMerchant: {
              [merchantId]: {
                checkoutOrderId: 1,
                merchant: {
                  id: merchantId,
                  name: 'merchant',
                },
                merchantOrderCode: 'PZ1129361393',
                returnAvailable: false,
                returnId: null,
                status: 'Reviewing order',
                tags: [],
                totalQuantity: 2,
                userId: 1,
              },
            },
          },
        },
      };
      const normalizedResultWithoutMerchants = {
        orders: {
          [orderId]: {
            anotherProp: 123,
            ...orderEntityDetails,
            byMerchant: {},
          },
        },
      };
      const state = {
        orders: { [orderId]: orderEntity },
      };
      const mappedResult = merge({}, normalizedResult.orders[orderId], {
        byMerchant: {
          [merchantId]: {
            merchant: merchantId,
          },
        },
      });
      const expectedMappedResult = {
        merchants: {
          [merchantId]: {
            id: merchantId,
            name: 'merchant',
          },
        },
        orders: {
          [orderId]: {
            ...merge({}, orderEntity, mappedResult),
          },
        },
      };
      const expectedMappedResultWithoutMerchants = {
        merchants: {},
        ...normalizedResultWithoutMerchants,
      };

      it('should handle FETCH_ORDERS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDERS_SUCCESS](state, {
            payload: { entities: normalizedResult },
            type: actionTypes.FETCH_ORDERS_SUCCESS,
          }),
        ).toEqual(expectedMappedResult);
      });

      it('should handle FETCH_ORDERS_SUCCESS action type when there are no merchants', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDERS_SUCCESS](state, {
            payload: { entities: normalizedResultWithoutMerchants },
            type: actionTypes.FETCH_ORDERS_SUCCESS,
          }),
        ).toEqual(expectedMappedResultWithoutMerchants);
      });
    });

    describe('for FETCH_ORDER_DETAILS_SUCCESS', () => {
      const orderDetailsEntity = {
        ...expectedOrderDetailsNormalizedPayload.entities,
      };
      const orderDetailsResult = {
        ...expectedOrderDetailsNormalizedPayload.result,
      };
      const orderItems = {
        [`${orderItemId}`]: {
          brand: 220482,
          categories: [136301, 136308],
          creationChannel: null,
          customAttributes: null,
          id: orderItemId,
          merchant: merchantId2,
        },
      };
      const normalizedResult = {
        countries: {
          167: {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            continentId: 3,
            culture: 'pt-PT',
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            regionId: 0,
            subRegion: null,
            subfolder: null,
          },
        },
      };
      const normalizedResultWithOrderItems = {
        ...normalizedResult,
        orderItems,
        orders: {
          [orderId]: {
            orderItems,
          },
        },
      };
      const state = {
        orders: {
          [orderId]: orderEntity,
        },
        ...orderDetailsEntity,
      };
      const expectedMappedResult = {
        orders: {
          [orderId]: merge({}, orderEntity, {
            createdDate: 1539688029817,
            id: '3558DS',
            totalItems: 3,
            billingAddress: {
              addressLine1: 'Uma rua em Gaia',
              addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
              addressLine3: null,
              city: {
                countryId: 165,
                id: 0,
                name: 'Canidelo',
                stateId: null,
              },
              country: {
                alpha2Code: 'PT',
                alpha3Code: 'PRT',
                continentId: 3,
                culture: 'pt-PT',
                id: 165,
                name: 'Portugal',
                nativeName: 'Portugal',
                region: 'Europe',
                regionId: 0,
                subRegion: null,
                subfolder: null,
              },
              ddd: null,
              firstName: 'Nelson',
              id: '00000000-0000-0000-0000-000000000000',
              isCurrentBilling: false,
              isCurrentShipping: false,
              lastName: 'Leite',
              neighbourhood: null,
              phone: '234234234',
              state: {
                code: 'Porto',
                countryId: 0,
                id: 0,
                name: 'Porto',
              },
              useShippingAsBillingAddress: false,
              userId: 0,
              vatNumber: null,
              zipCode: '1234-567',
            },
            credit: 0,
            formattedCredit: '0,00 €',
            formattedGrandTotal: '1 225,00 €',
            formattedSubTotalAmount: '1 225,00 €',
            formattedTotalDiscount: '0,00 €',
            formattedTotalDomesticTaxes: '0,00 €',
            formattedTotalShippingFee: '0,00 €',
            formattedTotalTaxes: '423,57 €',
            grandTotal: 1225,
            items: [10070161, 10070162, 10070163],
            newsletterSubscriptionOptionDefault: false,
            paymentId: 'TMADRWWJX2DPH2M7CTUX',
            shippingAddress: {
              addressLine1: 'Uma rua em Gaia',
              addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
              addressLine3: null,
              city: {
                countryId: 165,
                id: 0,
                name: 'Canidelo',
                stateId: null,
              },
              country: {
                alpha2Code: 'PT',
                alpha3Code: 'PRT',
                continentId: 3,
                culture: 'pt-PT',
                id: 165,
                name: 'Portugal',
                nativeName: 'Portugal',
                region: 'Europe',
                regionId: 0,
                subRegion: null,
                subfolder: null,
              },
              ddd: null,
              firstName: 'Nelson',
              id: '00000000-0000-0000-0000-000000000000',
              isCurrentBilling: false,
              isCurrentShipping: false,
              lastName: 'Leite',
              neighbourhood: null,
              phone: '234234234',
              state: {
                code: 'Porto',
                countryId: 0,
                id: 0,
                name: 'Porto',
              },
              useShippingAsBillingAddress: false,
              userId: 0,
              vatNumber: null,
              zipCode: '1234-567',
            },
            siteKeys: {},
            subTotalAmount: 1225,
            taxType: 'DDP',
            totalDiscount: 0,
            totalDomesticTaxes: 0,
            totalQuantity: 3,
            totalShippingFee: 0,
            totalTaxes: 423.57,
            userId: 29521154,
            updatedDate: 1539688029817,
          }),
        },
        ...merge({}, orderDetailsEntity, normalizedResult),
      };
      const expectedMappedResultGuest = {
        ...expectedMappedResult,
        orders: {
          [orderId]: {
            ...expectedMappedResult.orders[orderId],
            byMerchant: {},
          },
        },
      };
      const expectedMappedResultWithOrderItems = {
        ...expectedMappedResult,
        orders: {
          [orderId]: {
            ...expectedMappedResult.orders[orderId],
            byMerchant: merge(
              {},
              expectedMappedResult.orders[orderId].byMerchant,
              {
                [`${merchantId2}`]: {
                  merchant: merchantId2,
                  orderItems: [`${orderItemId}`],
                },
              },
            ),
            orderItems,
          },
        },
      };

      it('should handle FETCH_ORDER_DETAILS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_DETAILS_SUCCESS](
            merge({}, state),
            {
              meta: { orderId },
              payload: {
                entities: normalizedResult,
                result: orderDetailsResult,
              },
              type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
            },
          ),
        ).toEqual(expectedMappedResult);
      });

      it('should handle FETCH_ORDER_DETAILS_SUCCESS action type when the user is a guest', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_DETAILS_SUCCESS](
            merge({}, state),
            {
              meta: { orderId, guest: true },
              payload: {
                entities: normalizedResult,
                result: orderDetailsResult,
              },
              type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
            },
          ),
        ).toEqual(expectedMappedResultGuest);
      });

      it('should handle FETCH_ORDER_DETAILS_SUCCESS action type when the orderItem is not mapped yet', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_DETAILS_SUCCESS](
            merge({}, state),
            {
              meta: { orderId },
              payload: {
                entities: normalizedResultWithOrderItems,
                result: orderDetailsResult,
              },
              type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
            },
          ),
        ).toEqual(expectedMappedResultWithOrderItems);
      });
    });

    describe('for FETCH_ORDER_RETURN_OPTIONS_SUCCESS', () => {
      const returnOptionId = '10537_4';
      const mappedReturnOptionId = `${orderId}_${returnOptionId}`;
      const orderReturnOptionsEntity = {
        ...expectedOrderReturnOptionsNormalizedPayload.entities.returnOptions,
      };
      const orderReturnOptionsResult = {
        ...expectedOrderReturnOptionsNormalizedPayload.result,
      };
      const normalizedResult = id => ({
        returnOptions: {
          [id]: {
            allowedCountries: [165],
            id: id,
            isAddressMandatory: true,
            isMerchantLocationMandatory: false,
            isNumberOfBoxesMandatory: true,
            isSchedulePickup: true,
            merchant: 10537,
            merchantOrderId: 100001340,
            type: 3,
          },
        },
      });
      const state = merge(
        {},
        {
          orders: {
            [orderId]: orderEntity,
          },
          ...orderReturnOptionsEntity,
        },
      );

      const expectedMappedResult = {
        orders: {
          [orderId]: merge({}, orderEntity, {
            byMerchant: {
              [merchantId]: {
                returnOptions: [mappedReturnOptionId],
              },
            },
          }),
        },
        ...merge(
          {},
          orderReturnOptionsEntity,
          normalizedResult(mappedReturnOptionId),
        ),
      };

      it('should handle FETCH_ORDER_RETURN_OPTIONS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS](
            state,
            {
              meta: { orderId },
              payload: {
                entities: normalizedResult(returnOptionId),
                result: orderReturnOptionsResult,
              },
              type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
            },
          ),
        ).toEqual(expectedMappedResult);
      });
    });

    describe('for RESET_ORDERS', () => {
      const state = {
        orders: {
          [orderId]: orderEntity,
        },
        ...expectedOrderDetailsNormalizedPayload.entities,
      };
      const expectedResult = {
        ...omit(state, ['orders', 'orderItems']),
      };

      it('should handle RESET_ORDERS action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_ORDERS](merge({}, state)),
        ).toEqual(expectedResult);
      });
    });

    describe('for LOGOUT_SUCCESS', () => {
      const state = {
        ...expectedNormalizedPayload.entities,
        ...expectedOrderDetailsNormalizedPayload.entities,
        ...expectedOrderReturnOptionsNormalizedPayload.entities,
        ...expectedTrackingNormalizedPayload.entities,
      };
      const expectedResult = {
        ...omit(state, [
          'orders',
          'orderItems',
          'labelTracking',
          'returnOptions',
        ]),
      };

      it('should handle LOGOUT_SUCCESS action type', () => {
        expect(entitiesMapper[LOGOUT_SUCCESS](merge({}, state))).toEqual(
          expectedResult,
        );
      });
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
      error: {},
      isLoading: {},
    };

    const subAreas = {
      ordersList: { ...subAreaResult },
      orderDetails: { ...subAreaResult },
      orderReturnOptions: { ...subAreaResult },
      trackings: { ...subAreaResult },
    };

    const subAreaNames = [
      'OrdersList',
      'OrderDetails',
      'OrderReturnOptions',
      'Trackings',
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
