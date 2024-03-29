import * as fromEntities from '../../entities/selectors/entity.js';
import * as fromOrders from '../reducer.js';
import * as selectors from '../selectors.js';
import { type BlackoutError, toBlackoutError } from '@farfetch/blackout-client';
import {
  courierEntity,
  courierId,
  defaultHashedQuery,
  expectedGetUserOrdersResult,
  expectedGetUserOrdersResultByOrderId,
  labelTrackingEntity,
  merchantEntity,
  merchantEntity2,
  merchantOrderCode,
  merchantOrderCode2,
  merchantOrderCode3,
  merchantOrderId,
  merchantOrderId2,
  merchantOrderId3,
  mockOrderItemEntity2Denormalized,
  mockOrderItemEntityDenormalized,
  mockState,
  orderEntity,
  orderEntityDenormalized,
  orderEntityDenormalized2,
  orderId,
  orderId2,
  orderItemId,
  orderSummary,
  orderSummaryEntityDenormalized,
  orderSummaryEntityDenormalized2,
  orderSummaryEntityDenormalized3,
  productId,
  returnOptionEntity,
  returnOptionEntity2,
  returnOptionEntity2Denormalized,
  returnOptionEntity3Denormalized,
  returnOptionEntityDenormalized,
  trackingNumber,
} from 'tests/__fixtures__/orders/index.mjs';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';

describe('orders redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areUserOrdersLoading()', () => {
    it('should get the orders isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getIsLoading');

      expect(selectors.areUserOrdersLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return false if there is not a user id', () => {
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          user: undefined,
        },
      };

      expect(selectors.areUserOrdersLoading(newMockState)).toBe(false);
    });
  });

  describe('getUserOrdersError()', () => {
    it('should get the orders error property from state', () => {
      const expectedResult = mockState.orders.error;
      const spy = jest.spyOn(fromOrders, 'getError');

      expect(selectors.getUserOrdersError(mockState)).toBe(
        expectedResult[defaultHashedQuery],
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserOrdersResultByOrderId()', () => {
    it('should get the order result denormalized from state if it contains the response from fetch user orders', () => {
      expect(selectors.getUserOrdersResultByOrderId(mockState)).toEqual(
        expectedGetUserOrdersResultByOrderId,
      );
    });

    it('should return undefined if result property in state is undefined', () => {
      const expectedResult = undefined;
      const stateWithUndefinedResult = {
        ...mockState,
        orders: {
          ...mockState.orders,
          result: null,
        },
      };

      expect(
        selectors.getUserOrdersResultByOrderId(stateWithUndefinedResult),
      ).toEqual(expectedResult);
    });
  });

  describe('getUserOrdersResult()', () => {
    it('should get the order summary result denormalized from state if it contains the response from fetch user orders', () => {
      expect(selectors.getUserOrdersResult(mockState)).toEqual(
        expectedGetUserOrdersResult,
      );
    });
  });

  describe('isOrderLoading()', () => {
    it('should get the order isLoading property from state', () => {
      const expectedResult = mockState.orders.orderDetails.isLoading[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderDetails');

      expect(selectors.isOrderLoading(mockState, orderId)).toEqual(
        expectedResult,
      );
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

  describe('areOrderReturnOptionsLoading()', () => {
    it('should get the orderReturnOptions isLoading property from state', () => {
      const expectedResult =
        mockState.orders.orderReturnOptions.isLoading[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderReturnOptions');

      expect(
        selectors.areOrderReturnOptionsLoading(mockState, orderId),
      ).toEqual(expectedResult);
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
      const expectedResult = mockState.orders.trackings.isLoading;
      const spy = jest.spyOn(fromOrders, 'getShipmentTrackings');

      expect(selectors.areShipmentTrackingsLoading(mockState)).toEqual(
        expectedResult,
      );
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

  describe('areOrderDocumentsLoading()', () => {
    it('should get the documents isLoading property from state', () => {
      const expectedResult = mockState.orders.documents.isLoading;
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.areOrderDocumentsLoading(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderDocumentsError()', () => {
    it('should get the documents error property from state', () => {
      const expectedResult = mockState.orders.documents.error;
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.getOrderDocumentsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areOrderAvailableItemsActivitiesLoading()', () => {
    it('should get the orderAvailableItemsActivities isLoading property from state', () => {
      const expectedResult =
        mockState.orders.orderAvailableItemsActivities.isLoading;
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(
        selectors.areOrderAvailableItemsActivitiesLoading(mockState),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderAvailableItemsActivitiesError()', () => {
    it('should get the orderAvailableItemsActivities error property from state', () => {
      const expectedResult =
        mockState.orders.orderAvailableItemsActivities.error;
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(selectors.getOrderAvailableItemsActivitiesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areOrderItemAvailableActivitiesLoading()', () => {
    it('should get the orderItemAvailableItemsActivities isLoading property from state', () => {
      const expectedResult =
        mockState.orders.orderItemAvailableActivities.isLoading;
      const spy = jest.spyOn(fromOrders, 'getOrderItemAvailableActivities');

      expect(
        selectors.areOrderItemAvailableActivitiesLoading(mockState),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItemAvailableActivitiesError()', () => {
    it('should get the orderItemAvailableItemsActivities error property from state', () => {
      const expectedResult =
        mockState.orders.orderItemAvailableActivities.error;
      const spy = jest.spyOn(fromOrders, 'getOrderItemAvailableActivities');

      expect(selectors.getOrderItemAvailableActivitiesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrders()', () => {
    it('should get the orders from state', () => {
      const expectedResult = {
        [orderId]: orderEntityDenormalized,
        [orderId2]: orderEntityDenormalized2,
      };

      expect(selectors.getOrders(mockState)).toEqual(expectedResult);
    });
  });

  describe('getUserOrders()', () => {
    it('should get the order summaries from state', () => {
      const expectedResult = {
        [merchantOrderCode]: orderSummaryEntityDenormalized,
        [merchantOrderCode2]: orderSummaryEntityDenormalized2,
        [merchantOrderCode3]: orderSummaryEntityDenormalized3,
      };

      expect(selectors.getUserOrders(mockState)).toEqual(expectedResult);
    });
  });

  describe('getUserOrder()', () => {
    it('should get the order summary from state', () => {
      const expectedResult = orderSummaryEntityDenormalized;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserOrder(mockState, merchantOrderCode)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'orderSummaries');
    });

    it('should return undefined if there are no order summaries fetched', () => {
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          orderSummaries: undefined,
        },
      };

      expect(
        selectors.getUserOrder(newMockState, merchantOrderCode),
      ).toBeUndefined();
    });
  });

  describe('getOrder()', () => {
    it('should get the order from state', () => {
      expect(selectors.getOrder(mockState, orderId)).toEqual(
        orderEntityDenormalized,
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
    it('should get the order items property from state', () => {
      const expectedResult = {
        [mockOrderItemEntityDenormalized.id]: mockOrderItemEntityDenormalized,
        [mockOrderItemEntity2Denormalized.id]: mockOrderItemEntity2Denormalized,
      };
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrderItems(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(4);
    });
  });

  describe('getOrderItem()', () => {
    it('should get the merchant from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrderItem(mockState, orderItemId)).toEqual(
        mockOrderItemEntityDenormalized,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'orderItems');
    });

    it('should return undefined if there are no order items fetched', () => {
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          orderItems: undefined,
        },
      };

      expect(selectors.getOrderItem(newMockState, orderItemId)).toBeUndefined();
    });
  });

  describe('getReturnOptions()', () => {
    it('should get the return options from state', () => {
      const expectedResult = {
        [merchantOrderId]: returnOptionEntityDenormalized,
        [merchantOrderId2]: returnOptionEntity2Denormalized,
        [merchantOrderId3]: returnOptionEntity3Denormalized,
      };
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getReturnOptions(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should return undefined if there are no return options fetched', () => {
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returnOptions: undefined,
        },
      };

      expect(selectors.getReturnOptions(newMockState)).toBeUndefined();
    });
  });

  describe('getReturnOption()', () => {
    it('should get the return option from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getReturnOption(mockState, merchantOrderId)).toEqual({
        merchant: merchantEntity,
        ...returnOptionEntity,
      });
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOrderReturnOptions()', () => {
    const mockStateOrderReturnOptionsUndefined = {
      ...mockState,
      entities: {
        ...mockState.entities,
        returnOptions: undefined,
      },
    };

    const mockStateOrderReturnOptionsEmpty = {
      ...mockState,
      entities: {
        ...mockState.entities,
        returnOptions: {},
      },
    };

    const expectedOrderReturnOptionsDenormalized = {
      [merchantOrderId]: {
        ...returnOptionEntity,
        merchant: merchantEntity,
      },
      [merchantOrderId2]: {
        ...returnOptionEntity2,
        merchant: merchantEntity2,
      },
    };

    it('should get the return options from state when there are return options', () => {
      expect(selectors.getOrderReturnOptions(mockState, orderId)).toEqual(
        expectedOrderReturnOptionsDenormalized,
      );
    });

    it('should return empty object when return options entities are empty', () => {
      expect(
        selectors.getOrderReturnOptions(
          mockStateOrderReturnOptionsEmpty,
          orderId,
        ),
      ).toStrictEqual({});
    });

    it('should return undefined when order is undefined', () => {
      expect(
        selectors.getOrderReturnOptions(
          mockStateOrderReturnOptionsUndefined,
          orderId,
        ),
      ).toBeUndefined();
    });

    it('should return undefined when some return options were previously fetched but the ones associated to the order Id were not', () => {
      const mockStateWithoutReturnOption = {
        ...mockState,
        orders: {
          ...mockState.orders,
          orderReturnOptions: {
            ...mockState.orders.orderReturnOptions,
            result: { [orderId]: [merchantOrderId, merchantOrderId2] },
          },
        },
      };

      expect(
        selectors.getOrderReturnOptions(mockStateWithoutReturnOption, orderId2),
      ).toBeUndefined();
    });
  });

  describe('getOrderSummaries()', () => {
    it('should get the order summaries of a certain order id', () => {
      expect(selectors.getOrderSummaries(mockState, orderId)).toEqual({
        [merchantOrderCode]: orderSummaryEntityDenormalized,
        [merchantOrderCode2]: orderSummaryEntityDenormalized2,
      });
    });
  });

  describe('getOrderItemsByMerchantOrderCode()', () => {
    it('should get the order items by merchant order code from state', () => {
      const expectedResult = {
        [mockOrderItemEntityDenormalized.merchantOrderCode]: [
          mockOrderItemEntityDenormalized,
        ],
        [mockOrderItemEntity2Denormalized.merchantOrderCode]: [
          mockOrderItemEntity2Denormalized,
        ],
      };

      expect(
        selectors.getOrderItemsByMerchantOrderCode(mockState, orderId),
      ).toEqual(expectedResult);
    });

    it('should get undefined if there are no orderDetails from that order', () => {
      expect(
        selectors.getOrderItemsByMerchantOrderCode(mockState, 'randomOrderId'),
      ).toBeUndefined();
    });
  });

  describe('getOrderProductQuantity()', () => {
    it('should get the order item quantity as undefined from state', () => {
      const newState = {
        entities: {
          orders: {},
        },
      };

      expect(
        selectors.getOrderProductQuantity(newState, orderId, productId),
      ).toBeUndefined();
    });

    it('should get the order item quantity from state', () => {
      expect(
        selectors.getOrderProductQuantity(mockState, orderId, productId),
      ).toBe(1);
    });

    it('should get undefined if the order was not fetched', () => {
      expect(
        selectors.getOrderProductQuantity(
          mockState,
          'randomOrderId',
          productId,
        ),
      ).toBeUndefined();
    });
  });

  describe('areUserOrdersFetched()', () => {
    describe('when orders are loading', () => {
      const baseState = {
        entities: {
          orderSummaries: { [`${merchantOrderCode}`]: orderSummary },
          user: mockUsersResponse,
        },
        orders: {
          isLoading: { [defaultHashedQuery]: true },
          error: { [defaultHashedQuery]: toBlackoutError(new Error('Error')) },
          result: {},
          orderDetails: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: false },
          },
          orderReturnOptions: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: false },
            result: {},
          },
          trackings: {
            error: { name: '', message: 'Error', code: '123' },
            isLoading: false,
          },
          documents: {
            error: toBlackoutError(new Error('Error')),
            isLoading: false,
          },
          orderAvailableItemsActivities: {
            error: toBlackoutError(new Error('Error')),
            isLoading: false,
          },
          orderItemAvailableActivities: {
            error: toBlackoutError(new Error('Error')),
            isLoading: false,
          },
          guestOrders: {
            result: [],
            error: toBlackoutError(new Error('Error')),
            isLoading: false,
          },
          orderSummaries: {
            error: toBlackoutError(new Error('Error')),
            isLoading: false,
          },
        },
      };

      const defaultQuery = { page: 1, pageSize: 60 };

      it('should always return false', () => {
        // Case 1: Where `isLoading` is true and
        // there is no error and no result from a previous request
        expect(selectors.areUserOrdersFetched(baseState, defaultQuery)).toBe(
          false,
        );

        // Case 2: Where `isLoading` is true and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            error: {
              [defaultHashedQuery]: toBlackoutError(new Error('error')),
            },
          },
        };

        expect(
          selectors.areUserOrdersFetched(stateWithError, defaultQuery),
        ).toBe(false);

        // Case 3: Where `isLoading` is true and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              [defaultHashedQuery]: {
                entries: ['PZ1129361393'],
                totalPages: 1,
                number: 1,
                totalItems: 1,
              },
            },
          },
        };

        expect(
          selectors.areUserOrdersFetched(stateWithResult, defaultQuery),
        ).toBe(false);

        // Case 4: Where `isLoading` is true and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithResult.orders,
            error: {
              [defaultHashedQuery]: toBlackoutError(new Error('error')),
            },
          },
        };

        expect(
          selectors.areUserOrdersFetched(stateWithResultAndError, defaultQuery),
        ).toBe(false);
      });
    });

    describe('when orders are not loading', () => {
      const baseState = {
        entities: {
          orderSummaries: { [`${merchantOrderCode}`]: orderSummary },
          user: mockUsersResponse,
        },
        orders: {
          isLoading: { [defaultHashedQuery]: false },
          error: { '1:60': null },
          result: {},
          orderDetails: {
            error: { [orderId]: null },
            isLoading: { [orderId]: false },
          },
          orderReturnOptions: {
            error: { [orderId]: null },
            isLoading: { [orderId]: false },
            result: { [orderId]: [merchantOrderId, merchantOrderId2] },
          },
          trackings: {
            error: null,
            isLoading: false,
          },
          documents: {
            error: null,
            isLoading: false,
          },
          orderAvailableItemsActivities: {
            error: null,
            isLoading: false,
          },
          orderItemAvailableActivities: {
            error: null,
            isLoading: false,
          },
          guestOrders: {
            error: null,
            isLoading: false,
            result: null,
          },
          orderSummaries: {
            error: null,
            isLoading: false,
            result: null,
          },
        },
      };

      it('should return false if there is no error and no result', () => {
        expect(selectors.areUserOrdersFetched(baseState)).toBe(false);
      });

      it('should return true if there is either an error and/or a result', () => {
        // Case 1: Where `isLoading` is false and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            error: {
              [defaultHashedQuery]: toBlackoutError(new Error('error')),
            },
          },
        };

        expect(selectors.areUserOrdersFetched(stateWithError)).toBe(true);

        // Case 2: Where `isLoading` is false and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              [defaultHashedQuery]: {
                entries: ['PZ1129361393'],
                totalPages: 1,
                number: 1,
                totalItems: 1,
              },
            },
          },
        };

        expect(selectors.areUserOrdersFetched(stateWithResult)).toBe(true);

        // Case 3: Where `isLoading` is false and
        // there is a result and an error
        const stateWithResultAndError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            result: {
              [defaultHashedQuery]: {
                entries: ['PZ1129361393'],
                totalPages: 1,
                number: 1,
                totalItems: 1,
              },
            },
            error: {
              [defaultHashedQuery]: toBlackoutError(new Error('error')),
            },
          },
        };

        expect(selectors.areUserOrdersFetched(stateWithResultAndError)).toBe(
          true,
        );
      });
    });

    it('should return undefined if there is not a user id', () => {
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          user: undefined,
        },
      };

      expect(selectors.areUserOrdersFetched(newMockState)).toBeUndefined();
    });
  });

  describe('isOrderFetched()', () => {
    describe('when order is loading', () => {
      const baseState = {
        entities: {},
        orders: {
          isLoading: {},
          error: {},
          result: {},
          orderDetails: {
            isLoading: {
              [orderId]: true,
            },
            error: {},
          },
          orderReturnOptions: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: true },
            result: {},
          },
          trackings: {
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
          },
          documents: {
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
          },
          orderAvailableItemsActivities: {
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
          },
          orderItemAvailableActivities: {
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
          },
          orderSummaries: {
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
          },
          guestOrders: {
            result: null,
            error: toBlackoutError(new Error('Error')),
            isLoading: true,
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
              error: { [orderId]: toBlackoutError(new Error('error')) },
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
          isLoading: {},
          error: {},
          result: {},
          orderReturnOptions: {
            error: {},
            isLoading: {},
            result: {},
          },
          trackings: {
            error: null,
            isLoading: false,
          },
          documents: {
            error: null,
            isLoading: false,
          },
          orderAvailableItemsActivities: {
            error: null,
            isLoading: false,
          },
          orderItemAvailableActivities: {
            error: null,
            isLoading: false,
          },
          orderSummaries: {
            error: null,
            isLoading: false,
          },
          guestOrders: {
            result: null,
            error: null,
            isLoading: false,
          },
        },
      };

      it('should return false if there is no error and no result', () => {
        const newOrdersState = {
          // this logic should be fixed
          orders: {
            orderDetails: {
              isLoading: {},
              error: {},
            },
          },
        };
        const stateWithNoIsLoadingProp = {
          ...baseState,
          newOrdersState,
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

        const newEntitiesState = {
          // this logic should be fixed
          entities: { [orderId]: orderEntity },
        };
        const stateWithPartialOrder = {
          ...baseState,
          newEntitiesState,
        };

        expect(selectors.isOrderFetched(stateWithPartialOrder, orderId)).toBe(
          false,
        );

        // Case 2: Order does not have the items prop altogether
        const newEntitiesState2 = {
          // this logic should be fixed
          entities: { [orderId]: { id: orderId } },
        };
        const stateWithPartialOrderWithoutItemsProp = {
          ...baseState,
          newEntitiesState2,
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
              error: { [orderId]: toBlackoutError(new Error('error')) },
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

  describe('areOrderReturnOptionsFetched()', () => {
    describe('when order return options are loading', () => {
      const baseState = {
        entities: {},
        orders: {
          ...mockState.orders,
          orderReturnOptions: {
            isLoading: {
              [orderId]: true,
            },
            error: {},
            result: {
              [orderId]: [merchantOrderId, merchantOrderId2],
            },
          },
        },
      };

      it('should always return false', () => {
        // Case 1: Where `isLoading` is true and
        // there is no error and no result from a previous request
        expect(selectors.areOrderReturnOptionsFetched(baseState, orderId)).toBe(
          false,
        );

        // Case 2: Where `isLoading` is true and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            orderReturnOptions: {
              ...baseState.orders.orderReturnOptions,
              error: { [orderId]: new Error('error') as BlackoutError },
            },
          },
        };

        expect(
          selectors.areOrderReturnOptionsFetched(stateWithError, orderId),
        ).toBe(false);

        // Case 3: Where `isLoading` is true and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          entities: mockState.entities,
        };

        expect(
          selectors.areOrderReturnOptionsFetched(stateWithResult, orderId),
        ).toBe(false);

        // Case 4: Where `isLoading` is true and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithError.orders,
          },
        };

        expect(
          selectors.areOrderReturnOptionsFetched(
            stateWithResultAndError,
            orderId,
          ),
        ).toBe(false);
      });
    });

    describe('when order return options are not loading', () => {
      const baseState = {
        entities: {},
        orders: {
          ...mockState.orders,
          orderReturnOptions: {
            isLoading: {
              [orderId]: false,
            },
            error: {},
            result: {
              [orderId]: [merchantOrderId, merchantOrderId2],
            },
          },
        },
      };

      it('should return false if there is no error and no result', () => {
        const stateWithNoIsLoadingProp = {
          ...baseState,
          orders: {
            ...baseState.orders,
            orderReturnOptions: {
              isLoading: {},
              error: {},
              result: {},
            },
          },
        };

        // Case 1: There is no entry for the orderId in orderReturnOptions state
        expect(
          selectors.areOrderReturnOptionsFetched(
            stateWithNoIsLoadingProp,
            orderId,
          ),
        ).toBe(false);

        // Case 2: There is an entry for the orderId in orderReturnOptions state
        // and it is false.
        expect(selectors.areOrderReturnOptionsFetched(baseState, orderId)).toBe(
          false,
        );
      });

      it('should return true if there is either an error and/or a result', () => {
        // Case 1: Where `isLoading` is false and
        // there is an error from a previous request but no result
        const stateWithError = {
          ...baseState,
          orders: {
            ...baseState.orders,
            orderReturnOptions: {
              ...baseState.orders.orderReturnOptions,
              error: { [orderId]: new Error('error') as BlackoutError },
            },
          },
        };

        expect(
          selectors.areOrderReturnOptionsFetched(stateWithError, orderId),
        ).toBe(true);

        // Case 2: Where `isLoading` is false and
        // there is a result but no error
        const stateWithResult = {
          ...baseState,
          entities: mockState.entities,
        };

        expect(
          selectors.areOrderReturnOptionsFetched(stateWithResult, orderId),
        ).toBe(true);

        // Case 3: Where `isLoading` is false and
        // there is a result and an error
        const stateWithResultAndError = {
          ...stateWithResult,
          orders: {
            ...stateWithError.orders,
          },
        };

        expect(
          selectors.areOrderReturnOptionsFetched(
            stateWithResultAndError,
            orderId,
          ),
        ).toBe(true);
      });
    });
  });
});
