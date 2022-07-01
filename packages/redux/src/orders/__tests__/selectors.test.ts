import * as fromEntities from '../../entities/selectors/entity';
import * as fromOrders from '../reducer';
import * as selectors from '../selectors';
import {
  courierEntity,
  courierId,
  labelTrackingEntity,
  merchantEntity,
  merchantId,
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

  describe('isOrdersLoading()', () => {
    it('should get the orders isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getIsLoading');

      expect(selectors.isOrdersLoading(mockState)).toEqual(false);
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

  describe('isOrdersListLoading()', () => {
    it('should get the order isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrdersList');

      expect(selectors.isOrdersListLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isOrdersListError()', () => {
    it('should get the order error property from state', () => {
      const expectedResult = mockState.orders.ordersList.error;
      const spy = jest.spyOn(fromOrders, 'getOrdersList');

      expect(selectors.getOrdersListError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrdersPagination()', () => {
    it('should get the order error property from state', () => {
      const { number, totalItems, totalPages } = mockState.orders.result;
      const expectedResult = { number, totalItems, totalPages };
      const spy = jest.spyOn(fromOrders, 'getResult');

      expect(selectors.getOrdersPagination(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return undefined', () => {
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

  describe('isOrderDetails()', () => {
    it('should get the orderDetails isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderDetails');

      expect(selectors.isOrderDetailsLoading(mockState, orderId)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderDetailsError()', () => {
    it('should get the orderDetails error property from state', () => {
      const expectedResult = mockState.orders.orderDetails.error[orderId];
      const spy = jest.spyOn(fromOrders, 'getOrderDetails');

      expect(selectors.getOrderDetailsError(mockState, orderId)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isOrderReturnOptionsLoading()', () => {
    it('should get the orderReturnOptions isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderReturnOptions');

      expect(selectors.isOrderReturnOptionsLoading(mockState, orderId)).toEqual(
        false,
      );
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

  describe('isTrackingsLoading()', () => {
    it('should get the trackings isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getTrackings');

      expect(selectors.isTrackingsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTrackingsError()', () => {
    it('should get the trackings error property from state', () => {
      const expectedResult = mockState.orders.trackings.error;
      const spy = jest.spyOn(fromOrders, 'getTrackings');

      expect(selectors.getTrackingsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isDocumentsLoading()', () => {
    it('should get the documents isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getDocuments');

      expect(selectors.isDocumentsLoading(mockState)).toEqual(false);
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

  describe('isAvailableItemsActivitiesLoading()', () => {
    it('should get the orderAvailableItemsActivities isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderAvailableItemsActivities');

      expect(selectors.isAvailableItemsActivitiesLoading(mockState)).toEqual(
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

  describe('isOrderItemAvailableActivitiesLoading()', () => {
    it('should get the orderAvailableItemsActivities isLoading property from state', () => {
      const spy = jest.spyOn(fromOrders, 'getOrderItemAvailableActivities');

      expect(
        selectors.isOrderItemAvailableActivitiesLoading(mockState),
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
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getOrder(mockState, orderId)).toEqual(orderEntity);
      expect(spy).toHaveBeenCalledWith(mockState, 'orders', orderId);
    });
  });

  describe('getLabelTracking()', () => {
    it('should get the label tracking property from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getLabelTracking(mockState, trackingNumber)).toBe(
        labelTrackingEntity,
      );
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

      expect(selectors.getReturnOption(mockState, returnOptionId)).toBe(
        returnOptionEntity,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnOptionsFromOrder()', () => {
    it('should get the return options from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetReturnOptions = jest.spyOn(fromEntities, 'getEntities');

      expect(
        selectors.getReturnOptionsFromOrder(mockState, orderId, merchantId),
      ).toEqual([returnOptionEntity]);
      expect(spyGetOrder).toHaveBeenCalledTimes(1);
      expect(spyGetReturnOptions).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMerchantsFromOrder()', () => {
    it('should get the merchants from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetMerchant = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getMerchantsFromOrder(mockState, orderId)).toEqual([
        merchantEntity,
      ]);
      expect(spyGetOrder).toHaveBeenCalledTimes(1);
      expect(spyGetMerchant).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItemsByOrder()', () => {
    it('should get the order items by order from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrderItemsByOrder(mockState, orderId)).toEqual([
        orderItemEntity,
      ]);
      expect(spyGetOrder).toHaveBeenCalledTimes(1);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItemsByMerchant()', () => {
    it('should get the order items by merchant from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getOrderItemsByMerchant(mockState, orderId)).toEqual({
        [merchantId]: [orderItemEntity],
      });
      expect(spyGetOrder).toHaveBeenCalledTimes(1);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });
    it('should get undefined if there are no orderDetails from that order', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      expect(
        selectors.getOrderItemsByMerchant(mockState, 'randomOrderId'),
      ).toBe(undefined);
      expect(spyGetOrder).toHaveBeenCalledTimes(1);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItemQuantity()', () => {
    it('should get the order item quantity as undefined from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      const newState = {
        entities: {
          orders: { [`${orderId}`]: omit(orderEntity, 'items') },
        },
      };

      expect(
        selectors.getOrderItemQuantity(newState, orderId, orderItemId),
      ).toBe(undefined);
      expect(spyGetOrder).toHaveBeenCalledTimes(2);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });

    it('should get the order item quantity from state', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      expect(
        selectors.getOrderItemQuantity(mockState, orderId, orderItemId),
      ).toBe(1);
      expect(spyGetOrder).toHaveBeenCalledTimes(2);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });

    it('should get undefined if the order was not fetched', () => {
      const spyGetOrder = jest.spyOn(fromEntities, 'getEntityById');
      const spyGetOrderItems = jest.spyOn(fromEntities, 'getEntities');

      expect(
        selectors.getOrderItemQuantity(mockState, 'randomOrderId', orderItemId),
      ).toBe(undefined);
      expect(spyGetOrder).toHaveBeenCalledTimes(2);
      expect(spyGetOrderItems).toHaveBeenCalledTimes(1);
    });
  });
});
