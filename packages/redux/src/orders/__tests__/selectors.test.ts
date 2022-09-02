import * as fromEntities from '../../entities/selectors/entity';
import * as fromOrders from '../reducer';
import * as selectors from '../selectors';
import {
  courierEntity,
  courierId,
  expectedGetGuestOrdersResult,
  expectedGetUserOrdersResult,
  labelTrackingEntity,
  merchantEntity,
  merchantId,
  mockOrderEntityDenormalized,
  mockOrderItemEntityDenormalized,
  mockState,
  orderEntity,
  orderId,
  orderItemEntity,
  orderItemId,
  returnOptionEntity,
  returnOptionId,
  trackingNumber,
} from 'tests/__fixtures__/orders';
import omit from 'lodash/omit';

describe('orders redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areOrdersLoading()', () => {
    it('should get the orders isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getIsLoading');

      expect(selectors.areOrdersLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrdersError()', () => {
    it('should get the orders error property from state', () => {
      const expectedResult = mockState.orders.error;
      const spy = jest.spyOn(fromOrders, 'getError');

      expect(selectors.getOrdersError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrdersPagination()', () => {
    it('should get the order result property from state if the result contains the response from fetch user orders', () => {
      const { number, totalItems, totalPages } = mockState.orders.result;
      const expectedResult = { number, totalItems, totalPages };
      const spy = jest.spyOn(fromOrders, 'getResult');

      expect(selectors.getOrdersPagination(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return a pagination wrapper if the result contains the response from fetch guest orders', () => {
      const guestOrdersResult = ['ORDVX1', 'PQ4DS5'];

      const stateWithGuestOrdersResult = {
        ...mockState,
        orders: {
          ...mockState.orders,
          result: guestOrdersResult,
        },
      };

      const expectedResult = {
        number: 1,
        totalItems: guestOrdersResult.length,
        totalPages: 1,
      };
      const spy = jest.spyOn(fromOrders, 'getResult');

      expect(selectors.getOrdersPagination(stateWithGuestOrdersResult)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return undefined if result property in state is undefined', () => {
      const expectedResult = undefined;
      const spy = jest.spyOn(fromOrders, 'getResult');
      const newMock = {
        ...mockState,
        orders: {
          ...mockState.orders,
          result: undefined,
        },
      };
      expect(selectors.getOrdersPagination(newMock)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrdersResult()', () => {
    it('should get the order result denormalized from state if it contains the response from fetch user orders', () => {
      expect(selectors.getOrdersResult(mockState)).toEqual(
        expectedGetUserOrdersResult,
      );
    });

    it('should get the order result denormalized from state if it contains the response from fetch guest orders', () => {
      const guestOrdersResult = ['3558DS'];

      const stateWithGuestOrdersResult = {
        ...mockState,
        orders: {
          ...mockState.orders,
          result: guestOrdersResult,
        },
      };

      expect(selectors.getOrdersResult(stateWithGuestOrdersResult)).toEqual(
        expectedGetGuestOrdersResult,
      );
    });

    it('should return undefined if result property in state is undefined', () => {
      const expectedResult = undefined;
      const stateWithUndefinedResult = {
        ...mockState,
        orders: {
          ...mockState.orders,
          result: undefined,
        },
      };
      expect(selectors.getOrdersResult(stateWithUndefinedResult)).toEqual(
        expectedResult,
      );
    });
  });

  describe('isOrderLoading()', () => {
    it('should get the order isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderDetails');

      expect(selectors.isOrderLoading(mockState, orderId)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderError()', () => {
    it('should get the order error property from state', () => {
      const expectedResult = mockState.orders.orderDetails.error[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderDetails');

      expect(selectors.getOrderError(mockState, orderId)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areOrderReturnsLoading()', () => {
    it('should get the orderReturns isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderReturns');

      expect(selectors.areOrderReturnsLoading(mockState, orderId)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderReturnsError()', () => {
    it('should get the orderReturns error property from state', () => {
      const expectedResult = mockState.orders.orderReturns.error[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderReturns');

      expect(selectors.getOrderReturnsError(mockState, orderId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areOrderReturnOptionsLoading()', () => {
    it('should get the orderReturnOptions isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderReturnOptions');

      expect(
        selectors.areOrderReturnOptionsLoading(mockState, orderId),
      ).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderReturnOptionsError()', () => {
    it('should get the orderReturnOptions error property from state', () => {
      const expectedResult = mockState.orders.orderReturnOptions.error[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderReturnOptions');

      expect(selectors.getOrderReturnOptionsError(mockState, orderId)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areShipmentTrackingsLoading()', () => {
    it('should get the trackings isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getShipmentTrackings');

      expect(selectors.areShipmentTrackingsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getShipmentTrackingsError()', () => {
    it('should get the trackings error property from state', () => {
      const expectedResult = mockState.orders.trackings.error;
      const spy = jest.spyOn(fromOrders, 'getShipmentTrackings');

      expect(selectors.getShipmentTrackingsError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areDocumentsLoading()', () => {
    it('should get the documents isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.areDocumentsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDocumentsError()', () => {
    it('should get the documents error property from state', () => {
      const expectedResult = mockState.orders.documents.error;
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.getDocumentsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areAvailableItemsActivitiesLoading()', () => {
    it('should get the orderAvailableItemsActivities isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(selectors.areAvailableItemsActivitiesLoading(mockState)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAvailableItemsActivitiesError()', () => {
    it('should get the orderAvailableItemsActivities error property from state', () => {
      const expectedResult =
        mockState.orders.orderAvailableItemsActivities.error;
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(selectors.getAvailableItemsActivitiesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areOrderItemAvailableActivitiesLoading()', () => {
    it('should get the orderAvailableItemsActivities isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderItemAvailableActivities');

      expect(
        selectors.areOrderItemAvailableActivitiesLoading(mockState),
      ).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItemAvailableActivitiesError()', () => {
    it('should get the orderAvailableItemsActivities error property from state', () => {
      const expectedResult =
        mockState.orders.orderAvailableItemsActivities.error;
      const spy = jest.spyOn(fromOrders, 'getOrderItemAvailableActivities');

      expect(selectors.getOrderItemAvailableActivitiesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrders()', () => {
    it('should get the orders from state', () => {
      const expectedResult = mockState.entities.orders;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrders(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'orders');
    });
  });

  describe('getOrder()', () => {
    it('should get the order from state', () => {
      expect(selectors.getOrder(mockState, orderId)).toEqual(
        mockOrderEntityDenormalized,
      );
    });
  });

  describe('getShipmentTrackingLabel()', () => {
    it('should get the label tracking property from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getShipmentTrackingLabel(mockState, trackingNumber),
      ).toBe(labelTrackingEntity);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCourier()', () => {
    it('should get the courier property from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCourier(mockState, courierId)).toBe(courierEntity);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItems()', () => {
    it('should get the courier property from state', () => {
      const expectedResult = mockState.entities.orderItems;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrderItems(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItem()', () => {
    it('should get the merchant from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getOrderItem(mockState, orderItemId)).toEqual(
        orderItemEntity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'orderItems', orderItemId);
    });
  });

  describe('getReturnOptions()', () => {
    it('should get the return options from state', () => {
      const expectedResult = mockState.entities.returnOptions;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getReturnOptions(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnOption()', () => {
    it('should get the return option from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getReturnOption(mockState, `${orderId}_${returnOptionId}`),
      ).toBe(returnOptionEntity);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderReturnOptions()', () => {
    it('should get the return options from state', () => {
      expect(
        selectors.getOrderReturnOptions(mockState, orderId, merchantId),
      ).toEqual([
        {
          ...returnOptionEntity,
          merchant: mockState.entities.merchants[merchantId],
        },
      ]);
    });
  });

  describe('getOrderMerchants()', () => {
    it('should get the merchants from state', () => {
      expect(selectors.getOrderMerchants(mockState, orderId)).toEqual([
        merchantEntity,
      ]);
    });
  });

  describe('getOrderItemsByOrder()', () => {
    it('should get the order items by order from state', () => {
      expect(selectors.getOrderItemsByOrder(mockState, orderId)).toEqual([
        mockOrderItemEntityDenormalized,
      ]);
    });
  });

  describe('getOrderItemsByMerchant()', () => {
    it('should get the order items by merchant from state', () => {
      expect(selectors.getOrderItemsByMerchant(mockState, orderId)).toEqual({
        [merchantId]: [mockOrderItemEntityDenormalized],
      });
    });
    it('should get undefined if there are no orderDetails from that order', () => {
      expect(
        selectors.getOrderItemsByMerchant(mockState, 'randomOrderId'),
      ).toBe(undefined);
    });
  });

  describe('getOrderItemQuantity()', () => {
    it('should get the order item quantity as undefined from state', () => {
      const newState = {
        entities: {
          orders: { [`${orderId}`]: omit(orderEntity, 'items') },
        },
      };

      expect(
        selectors.getOrderItemQuantity(newState, orderId, orderItemId),
      ).toBe(undefined);
    });

    it('should get the order item quantity from state', () => {
      expect(
        selectors.getOrderItemQuantity(mockState, orderId, orderItemId),
      ).toBe(1);
    });

    it('should get undefined if the order was not fetched', () => {
      expect(
        selectors.getOrderItemQuantity(mockState, 'randomOrderId', orderItemId),
      ).toBe(undefined);
    });
  });

  describe('areOrdersFetched()', () => {
    describe('when orders are loading', () => {
      const baseState = {
        entities: {
          orders: { [`${orderId}`]: orderEntity },
        },
        orders: {
          isLoading: true,
        },
      };

      it('should always return false', () => {
        // Case 1: Where `isLoading` is true and
        // there is no error and no result from a previous request
        expect(selectors.areOrdersFetched(baseState)).toBe(false);

        // Case 2: Where `isLoading` is true and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            error: new Error('error'),
          },
        };

        expect(selectors.areOrdersFetched(stateWithError)).toBe(false);

        // Case 3: Where `isLoading` is true and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              entries: ['ORDVX1'],
              totalPages: 1,
              number: 1,
              totalItems: 1,
            },
          },
        };

        expect(selectors.areOrdersFetched(stateWithResult)).toBe(false);

        // Case 4: Where `isLoading` is true and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithResult.orders,
            error: new Error('error'),
          },
        };

        expect(selectors.areOrdersFetched(stateWithResultAndError)).toBe(false);
      });
    });

    describe('when orders are not loading', () => {
      const baseState = {
        entities: {
          orders: { [`${orderId}`]: orderEntity },
        },
        orders: {
          isLoading: false,
        },
      };

      it('should return false if there is no error and no result', () => {
        expect(selectors.areOrdersFetched(baseState)).toBe(false);
      });

      it('should return true if there is either an error and/or a result', () => {
        // Case 1: Where `isLoading` is false and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            error: new Error('error'),
          },
        };

        expect(selectors.areOrdersFetched(stateWithError)).toBe(true);

        // Case 2: Where `isLoading` is false and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              entries: ['ORDVX1'],
              totalPages: 1,
              number: 1,
              totalItems: 1,
            },
          },
        };

        expect(selectors.areOrdersFetched(stateWithResult)).toBe(true);

        // Case 3: Where `isLoading` is false and
        // there is a result and an error
        const stateWithResultAndError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              entries: ['ORDVX1'],
              totalPages: 1,
              number: 1,
              totalItems: 1,
            },
            error: new Error('error'),
          },
        };

        expect(selectors.areOrdersFetched(stateWithResultAndError)).toBe(true);
      });
    });
  });

  describe('isOrderFetched()', () => {
    describe('when order is loading', () => {
      const baseState = {
        entities: {},
        orders: {
          orderDetails: {
            isLoading: {
              [orderId]: true,
            },
            error: {},
          },
        },
      };

      it('should always return false', () => {
        // Case 1: Where `isLoading` is true and
        // there is no error and no result from a previous request
        expect(selectors.isOrderFetched(baseState, orderId)).toBe(false);

        // Case 2: Where `isLoading` is true and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            orderDetails: {
              ...baseState.orders.orderDetails,
              error: { [orderId]: new Error('error') },
            },
          },
        };

        expect(selectors.isOrderFetched(stateWithError, orderId)).toBe(false);

        // Case 3: Where `isLoading` is true and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          entities: {
            orders: { [orderId]: orderEntity },
          },
        };

        expect(selectors.isOrderFetched(stateWithResult, orderId)).toBe(false);

        // Case 4: Where `isLoading` is true and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithError.orders,
          },
        };

        expect(selectors.isOrderFetched(stateWithResultAndError, orderId)).toBe(
          false,
        );
      });
    });

    describe('when order is not loading', () => {
      const baseState = {
        entities: {},
        orders: {
          orderDetails: {
            isLoading: {
              [orderId]: false,
            },
            error: {},
          },
        },
      };

      it('should return false if there is no error and no result', () => {
        const stateWithNoIsLoadingProp = {
          ...baseState,
          orders: {
            orderDetails: {
              isLoading: {},
              error: {},
            },
          },
        };

        // Case 1: There is no entry for the orderId in orderDetails state
        expect(
          selectors.isOrderFetched(stateWithNoIsLoadingProp, orderId),
        ).toBe(false);

        // Case 2: There is an entry for the orderId in orderDetais state
        // and it is false.
        expect(selectors.isOrderFetched(baseState, orderId)).toBe(false);
      });

      it('should return false if there is a result but it does not contain the `items` property', () => {
        // Case 1: Order has items prop but the order item entities it points to
        // are not in entities
        const stateWithPartialOrder = {
          ...baseState,
          entities: { [orderId]: orderEntity },
        };

        expect(selectors.isOrderFetched(stateWithPartialOrder, orderId)).toBe(
          false,
        );

        // Case 2: Order does not have the items prop altogether
        const stateWithPartialOrderWithoutItemsProp = {
          ...baseState,
          entities: { [orderId]: { id: orderId } },
        };

        expect(
          selectors.isOrderFetched(
            stateWithPartialOrderWithoutItemsProp,
            orderId,
          ),
        ).toBe(false);
      });

      it('should return true if there is either an error and/or a result', () => {
        // Case 1: Where `isLoading` is false and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            orderDetails: {
              ...baseState.orders.orderDetails,
              error: { [orderId]: new Error('error') },
            },
          },
        };

        expect(selectors.isOrderFetched(stateWithError, orderId)).toBe(true);

        // Case 2: Where `isLoading` is false and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          entities: {
            ...mockState.entities,
          },
        };

        expect(selectors.isOrderFetched(stateWithResult, orderId)).toBe(true);

        // Case 3: Where `isLoading` is false and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithError.orders,
          },
        };

        expect(selectors.isOrderFetched(stateWithResultAndError, orderId)).toBe(
          true,
        );
      });
    });
  });
});
