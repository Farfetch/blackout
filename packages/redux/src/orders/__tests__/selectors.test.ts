import * as fromEntities from '../../entities/selectors/entity.js';
import * as fromOrders from '../reducer.js';
import * as selectors from '../selectors.js';
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
  mockOrderItemEntity2Denormalized,
  mockOrderItemEntityDenormalized,
  mockState,
  orderEntity,
  orderEntityDenormalized,
  orderEntityDenormalized2,
  orderId,
  orderId2,
  orderItemEntity,
  orderItemId,
  orderSummary,
  orderSummaryEntityDenormalized,
  orderSummaryEntityDenormalized2,
  orderSummaryEntityDenormalized3,
  returnOptionEntity,
  returnOptionId,
  trackingNumber,
} from 'tests/__fixtures__/orders/index.mjs';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import { omit } from 'lodash-es';
import { toBlackoutError } from '@farfetch/blackout-client';

describe('orders redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areUserOrdersLoading()', () => {
    it('should get the orders isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getIsLoading');

      expect(selectors.areUserOrdersLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
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

  describe('areOrderReturnsLoading()', () => {
    it('should get the orderReturns isLoading property from state', () => {
      const expectedResult = mockState.orders.orderReturns.isLoading[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderReturns');

      expect(selectors.areOrderReturnsLoading(mockState, orderId)).toEqual(
        expectedResult,
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

  describe('areDocumentsLoading()', () => {
    it('should get the documents isLoading property from state', () => {
      const expectedResult = mockState.orders.documents.isLoading;
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.areDocumentsLoading(mockState)).toEqual(expectedResult);
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
      const expectedResult =
        mockState.orders.orderAvailableItemsActivities.isLoading;
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(selectors.areAvailableItemsActivitiesLoading(mockState)).toEqual(
        expectedResult,
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

  describe('getAllOrders()', () => {
    it('should get the orders from state', () => {
      const expectedResult = {
        [orderId]: orderEntityDenormalized,
        [orderId2]: orderEntityDenormalized2,
      };

      expect(selectors.getAllOrders(mockState)).toEqual(expectedResult);
    });
  });

  describe('getAllUserOrders()', () => {
    it('should get the order summaries from state', () => {
      const expectedResult = {
        [merchantOrderCode]: orderSummaryEntityDenormalized,
        [merchantOrderCode2]: orderSummaryEntityDenormalized2,
        [merchantOrderCode3]: orderSummaryEntityDenormalized3,
      };

      expect(selectors.getAllUserOrders(mockState)).toEqual(expectedResult);
    });
  });

  describe('getUserOrder()', () => {
    it('should get the order summary from state', () => {
      const expectedResult =
        mockState.entities.orderSummaries[merchantOrderCode];
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getUserOrder(mockState, merchantOrderCode)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'orderSummaries',
        merchantOrderCode,
      );
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

  // describe('getOrderReturnOptions()', () => {
  //   const mockStateOrderReturnOptionsUndefined = {
  //     ...mockState,
  //     entities: {
  //       ...mockState.entities,
  //       orders: {
  //         [orderId]: {
  //           ...orderEntity,
  //           returnOptions: undefined,
  //         },
  //       },
  //     },
  //   };

  //   const mockStateOrderReturnOptionsEmptyArray = {
  //     ...mockState,
  //     entities: {
  //       ...mockState.entities,
  //       orders: {
  //         [orderId]: {
  //           ...orderEntity,
  //           returnOptions: [],
  //         },
  //       },
  //     },
  //   };

  //   describe('when merchantId argument is not provided', () => {
  //     fit('should get the return options from state when there are return options', () => {
  //       expect(selectors.getOrderReturnOptions(mockState, orderId)).toEqual(
  //         orderEntityDenormalized.returnOptions,
  //       );
  //     });

  //     it('should return empty array when order.returnOptions property is an empty array', () => {
  //       expect(
  //         selectors.getOrderReturnOptions(
  //           mockStateOrderReturnOptionsEmptyArray,
  //           orderId,
  //         ),
  //       ).toStrictEqual([]);
  //     });

  //     it('should return undefined when order.returnOptions is undefined', () => {
  //       expect(
  //         selectors.getOrderReturnOptions(
  //           mockStateOrderReturnOptionsUndefined,
  //           orderId,
  //         ),
  //       ).toBe(undefined);
  //     });
  //   });

  //   describe('when merchantId argument is provided', () => {
  //     it('should get the merchant return options from state when there are return options', () => {
  //       expect(
  //         selectors.getOrderReturnOptions(mockState, orderId, merchantId),
  //       ).toEqual(orderEntityDenormalized.byMerchant[merchantId].returnOptions);
  //     });

  //     it('should return empty array when order.returnOptions property is an empty array', () => {
  //       expect(
  //         selectors.getOrderReturnOptions(
  //           mockStateOrderReturnOptionsEmptyArray,
  //           orderId,
  //           merchantId,
  //         ),
  //       ).toStrictEqual([]);
  //     });

  //     it('should return undefined when order.returnOptions is undefined', () => {
  //       expect(
  //         selectors.getOrderReturnOptions(
  //           mockStateOrderReturnOptionsUndefined,
  //           orderId,
  //           merchantId,
  //         ),
  //       ).toBe(undefined);
  //     });
  //   });
  // });

  // describe('getOrderReturns()', () => {
  //   const mockStateOrderReturnsUndefined = {
  //     ...mockState,
  //     entities: {
  //       ...mockState.entities,
  //       orders: {
  //         [orderId]: {
  //           ...orderEntity,
  //           returns: undefined,
  //         },
  //       },
  //     },
  //   };

  //   const mockStateOrderReturnsEmptyArray = {
  //     ...mockState,
  //     entities: {
  //       ...mockState.entities,
  //       orders: {
  //         [orderId]: {
  //           ...orderEntity,
  //           returns: [],
  //         },
  //       },
  //     },
  //   };

  //   describe('when merchantId argument is not provided', () => {
  //     it('should get the returns from state when there are returns', () => {
  //       expect(selectors.getOrderReturns(mockState, orderId)).toEqual(
  //         orderEntityDenormalized.returns,
  //       );
  //     });

  //     it('should return empty array when order.returns property is an empty array', () => {
  //       expect(
  //         selectors.getOrderReturns(mockStateOrderReturnsEmptyArray, orderId),
  //       ).toStrictEqual([]);
  //     });

  //     it('should return undefined when order.returns is undefined', () => {
  //       expect(
  //         selectors.getOrderReturns(mockStateOrderReturnsUndefined, orderId),
  //       ).toBe(undefined);
  //     });
  //   });

  //   describe('when merchantId argument is provided', () => {
  //     it('should get the merchant returns from state when there are returns', () => {
  //       expect(
  //         selectors.getOrderReturns(mockState, orderId, merchantId),
  //       ).toEqual(orderEntityDenormalized.byMerchant[merchantId].returns);
  //     });

  //     it('should return empty array when order.returns property is an empty array', () => {
  //       expect(
  //         selectors.getOrderReturns(
  //           mockStateOrderReturnsEmptyArray,
  //           orderId,
  //           merchantId,
  //         ),
  //       ).toStrictEqual([]);
  //     });

  //     it('should return undefined when order.returns is undefined', () => {
  //       expect(
  //         selectors.getOrderReturns(
  //           mockStateOrderReturnsUndefined,
  //           orderId,
  //           merchantId,
  //         ),
  //       ).toBe(undefined);
  //     });
  //   });
  // });

  describe('getOrderMerchants()', () => {
    it('should get the merchants from state', () => {
      expect(selectors.getOrderMerchants(mockState, orderId)).toEqual([
        merchantEntity,
        merchantEntity2,
      ]);
    });
  });

  describe('getOrderItemsByOrder()', () => {
    it('should get the order items by order from state', () => {
      expect(selectors.getOrderItemsByOrder(mockState, orderId)).toEqual(
        orderEntityDenormalized.items,
      );
    });
  });

  describe('getOrderItemsByMerchantOrderCode()', () => {
    it('should get the order items by merchant from state', () => {
      const expectedResult = {
        [mockOrderItemEntityDenormalized.merchantOrderCode]: [
          mockOrderItemEntityDenormalized,
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
        // @ts-ignore
        selectors.getOrderItemQuantity(newState, orderId, orderItemId),
      ).toBeUndefined();
    });

    it('should get the order item quantity from state', () => {
      expect(
        selectors.getOrderItemQuantity(mockState, orderId, orderItemId),
      ).toBe(1);
    });

    it('should get undefined if the order was not fetched', () => {
      expect(
        selectors.getOrderItemQuantity(mockState, 'randomOrderId', orderItemId),
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
          orderReturns: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: false },
          },
          orderReturnOptions: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: false },
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
          orderReturns: {
            error: { [orderId]: null },
            isLoading: { [orderId]: false },
          },
          orderReturnOptions: {
            error: { [orderId]: null },
            isLoading: { [orderId]: false },
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
          orderReturns: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: true },
          },
          orderReturnOptions: {
            error: { [orderId]: toBlackoutError(new Error('Error')) },
            isLoading: { [orderId]: true },
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
          orderReturns: {
            error: {},
            isLoading: {},
          },
          orderReturnOptions: {
            error: {},
            isLoading: {},
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

  // describe('areOrderReturnOptionsFetched()', () => {
  //   describe('when order return options are loading', () => {
  //     const baseState = {
  //       entities: {},
  //       orders: {
  //         ...mockState.orders,
  //         orderReturnOptions: {
  //           isLoading: {
  //             [orderId]: true,
  //           },
  //           error: {},
  //         },
  //       },
  //     };

  //     it('should always return false', () => {
  //       // Case 1: Where `isLoading` is true and
  //       // there is no error and no result from a previous request
  //       expect(selectors.areOrderReturnOptionsFetched(baseState, orderId)).toBe(
  //         false,
  //       );

  //       // Case 2: Where `isLoading` is true and
  //       // there is an error from a previous request but no result
  //       const stateWithError = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturnOptions: {
  //             ...baseState.orders.orderReturnOptions,
  //             error: { [orderId]: new Error('error') as BlackoutError },
  //           },
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(stateWithError, orderId),
  //       ).toBe(false);

  //       // Case 3: Where `isLoading` is true and
  //       // there is a result but no error
  //       const stateWithResult = {
  //         ...baseState,
  //         entities: mockState.entities,
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(stateWithResult, orderId),
  //       ).toBe(false);

  //       // Case 4: Where `isLoading` is true and
  //       // there is a result and an error
  //       const stateWithResultAndError = {
  //         ...stateWithResult,
  //         orders: {
  //           ...stateWithError.orders,
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(
  //           stateWithResultAndError,
  //           orderId,
  //         ),
  //       ).toBe(false);
  //     });
  //   });

  //   describe('when order return options are not loading', () => {
  //     const baseState = {
  //       entities: {},
  //       orders: {
  //         ...mockState.orders,
  //         orderReturnOptions: {
  //           isLoading: {
  //             [orderId]: false,
  //           },
  //           error: {},
  //         },
  //       },
  //     };

  //     it('should return false if there is no error and no result', () => {
  //       const stateWithNoIsLoadingProp = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturnOptions: {
  //             isLoading: {},
  //             error: {},
  //           },
  //         },
  //       };

  //       // Case 1: There is no entry for the orderId in orderReturnOptions state
  //       expect(
  //         selectors.areOrderReturnOptionsFetched(
  //           stateWithNoIsLoadingProp,
  //           orderId,
  //         ),
  //       ).toBe(false);

  //       // Case 2: There is an entry for the orderId in orderReturnOptions state
  //       // and it is false.
  //       expect(selectors.areOrderReturnOptionsFetched(baseState, orderId)).toBe(
  //         false,
  //       );
  //     });

  //     it('should return true if there is either an error and/or a result', () => {
  //       // Case 1: Where `isLoading` is false and
  //       // there is an error from a previous request but no result
  //       const stateWithError = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturnOptions: {
  //             ...baseState.orders.orderReturnOptions,
  //             error: { [orderId]: new Error('error') as BlackoutError },
  //           },
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(stateWithError, orderId),
  //       ).toBe(true);

  //       // Case 2: Where `isLoading` is false and
  //       // there is a result but no error
  //       const stateWithResult = {
  //         ...baseState,
  //         entities: mockState.entities,
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(stateWithResult, orderId),
  //       ).toBe(true);

  //       // Case 3: Where `isLoading` is false and
  //       // there is a result and an error
  //       const stateWithResultAndError = {
  //         ...stateWithResult,
  //         orders: {
  //           ...stateWithError.orders,
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnOptionsFetched(
  //           stateWithResultAndError,
  //           orderId,
  //         ),
  //       ).toBe(true);
  //     });
  //   });
  // });

  // describe('areOrderReturnsFetched()', () => {
  //   describe('when order returns are loading', () => {
  //     const baseState = {
  //       entities: {},
  //       orders: {
  //         ...mockState.orders,
  //         orderReturns: {
  //           isLoading: {
  //             [orderId]: true,
  //           },
  //           error: {},
  //         },
  //       },
  //     };

  //     it('should always return false', () => {
  //       // Case 1: Where `isLoading` is true and
  //       // there is no error and no result from a previous request
  //       expect(selectors.areOrderReturnsFetched(baseState, orderId)).toBe(
  //         false,
  //       );

  //       // Case 2: Where `isLoading` is true and
  //       // there is an error from a previous request but no result
  //       const stateWithError = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturns: {
  //             ...baseState.orders.orderReturns,
  //             error: { [orderId]: new Error('error') as BlackoutError },
  //           },
  //         },
  //       };

  //       expect(selectors.areOrderReturnsFetched(stateWithError, orderId)).toBe(
  //         false,
  //       );

  //       // Case 3: Where `isLoading` is true and
  //       // there is a result but no error
  //       const stateWithResult = {
  //         ...baseState,
  //         entities: mockState.entities,
  //       };

  //       expect(selectors.areOrderReturnsFetched(stateWithResult, orderId)).toBe(
  //         false,
  //       );

  //       // Case 4: Where `isLoading` is true and
  //       // there is a result and an error
  //       const stateWithResultAndError = {
  //         ...stateWithResult,
  //         orders: {
  //           ...stateWithError.orders,
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnsFetched(stateWithResultAndError, orderId),
  //       ).toBe(false);
  //     });
  //   });

  //   describe('when order returns are not loading', () => {
  //     const baseState = {
  //       entities: {},
  //       orders: {
  //         ...mockState.orders,
  //         orderReturns: {
  //           isLoading: {
  //             [orderId]: false,
  //           },
  //           error: {},
  //         },
  //       },
  //     };

  //     it('should return false if there is no error and no result', () => {
  //       const stateWithNoIsLoadingProp = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturns: {
  //             isLoading: {},
  //             error: {},
  //           },
  //         },
  //       };

  //       // Case 1: There is no entry for the orderId in orderReturns state
  //       expect(
  //         selectors.areOrderReturnsFetched(stateWithNoIsLoadingProp, orderId),
  //       ).toBe(false);

  //       // Case 2: There is an entry for the orderId in orderReturns state
  //       // and it is false.
  //       expect(selectors.areOrderReturnsFetched(baseState, orderId)).toBe(
  //         false,
  //       );
  //     });

  //     it('should return true if there is either an error and/or a result', () => {
  //       // Case 1: Where `isLoading` is false and
  //       // there is an error from a previous request but no result
  //       const stateWithError = {
  //         ...baseState,
  //         orders: {
  //           ...baseState.orders,
  //           orderReturns: {
  //             ...baseState.orders.orderReturns,
  //             error: { [orderId]: new Error('error') as BlackoutError },
  //           },
  //         },
  //       };

  //       expect(selectors.areOrderReturnsFetched(stateWithError, orderId)).toBe(
  //         true,
  //       );

  //       // Case 2: Where `isLoading` is false and
  //       // there is a result but no error
  //       const stateWithResult = {
  //         ...baseState,
  //         entities: mockState.entities,
  //       };

  //       expect(selectors.areOrderReturnsFetched(stateWithResult, orderId)).toBe(
  //         true,
  //       );

  //       // Case 3: Where `isLoading` is false and
  //       // there is a result and an error
  //       const stateWithResultAndError = {
  //         ...stateWithResult,
  //         orders: {
  //           ...stateWithError.orders,
  //         },
  //       };

  //       expect(
  //         selectors.areOrderReturnsFetched(stateWithResultAndError, orderId),
  //       ).toBe(true);
  //     });
  //   });
  // });
});
