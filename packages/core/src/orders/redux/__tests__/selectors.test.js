import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromOrders from '../reducer';
import * as selectors from '../selectors';
import {
  countryId,
  courierId,
  merchantId,
  merchantId2,
  merchantOrderCode,
  merchantOrderCode2,
  orderId,
  orderItemId,
  returnOptionId,
  status,
  trackingNumber,
  userId,
} from '../__fixtures__/orders.fixtures';
import omit from 'lodash/omit';

describe('orders redux selectors', () => {
  const returnOptionEntity = {
    id: returnOptionId,
    type: 3,
  };
  const orderEntity = {
    id: orderId,
    byMerchant: {
      [`${merchantId}`]: {
        checkoutOrderId: 2222,
        returnOptions: [returnOptionId],
        orderItems: [orderItemId],
      },
    },
    items: [orderItemId],
  };
  const orderEntitySplitByMerchantOrderCode = {
    ...orderEntity,
    byMerchant: {
      [`${merchantId}`]: {
        [merchantOrderCode]: {
          userId,
          totalQuantity: 1,
          status,
          merchantOrderCode,
          orderItems: [orderItemId],
        },
        returnOptions: [returnOptionId],
      },
      [`${merchantId2}`]: {
        [merchantOrderCode2]: {
          userId,
          totalQuantity: 1,
          status,
          merchantOrderCode: merchantOrderCode2,
          orderItems: [orderItemId],
        },
        returnOptions: [returnOptionId],
      },
    },
  };
  const labelTrackingEntity = {
    courier: courierId,
    estimatedDeliveryDate: '2019-05-24T22:59:00Z',
    events: [
      {
        code: 'PU',
        date: '2019-05-23T18:35:23Z',
        description: 'Shipment picked up',
        location: 'DOCKLANDS-GBR',
        signatory: '',
      },
    ],
    isEstimatedDeliveryDateTrusworthy: false,
    service: 'DOMESTIC EXPRESS',
    trackingNumber,
  };
  const courierEntity = {
    id: courierId,
    name: 'DHL',
  };
  const merchantEntity = { id: merchantId, name: 'merchant' };
  const orderItemEntity = {
    brand: 220482,
    id: orderItemId,
  };
  const countryEntity = {
    id: countryId,
    name: 'Portugal',
  };
  const mockState = {
    orders: {
      error: 'error: not loaded',
      isLoading: false,
      result: {
        userId: 29528565,
        items: {
          entries: [`${orderId}`],
          number: 1,
          totalItems: 1,
          totalPages: 1,
        },
        seoPageType: 1,
        redirectUrl: null,
        components: {},
        siteKeys: {},
        seoMetadata: null,
        staticPath: null,
        baseUrl: null,
        relativeUrl: null,
        returnUrl: null,
        translationsUrl: null,
        subfolder: null,
        slug: null,
        serverSideJsApp: null,
        currencyCode: null,
        currencyCultureCode: null,
        pageContent: null,
        dataLayer: null,
        isMobileDevice: false,
        screenPixelsWidth: 0,
        screenPixelsHeight: 0,
        countryCode: null,
        countryId: 0,
        cultureCode: null,
        pageType: null,
        clientOnlyPage: false,
        requestSourceCountryCode: null,
        newsletterSubscriptionOptionDefault: false,
        view: null,
      },
      ordersList: {
        error: 'error: not loaded',
        isLoading: false,
      },
      orderDetails: {
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
    },
    entities: {
      courier: {
        [`${courierId}`]: courierEntity,
      },
      labelTracking: {
        [`${trackingNumber}`]: labelTrackingEntity,
      },
      orders: { [`${orderId}`]: orderEntity },
      merchants: {
        [`${merchantId}`]: merchantEntity,
      },
      orderItems: {
        [`${orderItemId}`]: orderItemEntity,
      },
      countries: {
        [`${countryId}`]: countryEntity,
      },
      returnOptions: {
        [`${returnOptionId}`]: returnOptionEntity,
      },
    },
  };

  const mockStateSplitByMerchantOrderCode = {
    ...mockState,
    entities: {
      ...mockState.entities,
      orders: { [`${orderId}`]: orderEntitySplitByMerchantOrderCode },
    },
  };

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
      const { number, totalItems, totalPages } = mockState.orders.result.items;
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
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrders(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'orders');
    });
  });

  describe('getOrder()', () => {
    it('should get the order from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrder(mockState, orderId)).toEqual(orderEntity);
      expect(spy).toHaveBeenCalledWith(mockState, 'orders', orderId);
    });
  });

  describe('getLabelTracking()', () => {
    it('should get the label tracking property from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getLabelTracking(mockState, trackingNumber)).toBe(
        labelTrackingEntity,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCourier()', () => {
    it('should get the courier property from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCourier(mockState, courierId)).toBe(courierEntity);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMerchants()', () => {
    it('should get the merchants from state', () => {
      const expectedResult = mockState.entities.merchants;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getMerchants(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMerchant()', () => {
    it('should get the merchant from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getMerchant(mockState, merchantId)).toEqual(
        merchantEntity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'merchants', merchantId);
    });
  });

  describe('getOrderItems()', () => {
    it('should get the courier property from state', () => {
      const expectedResult = mockState.entities.orderItems;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrderItems(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrderItem()', () => {
    it('should get the merchant from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrderItem(mockState, orderItemId)).toEqual(
        orderItemEntity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'orderItems', orderItemId);
    });
  });

  describe('getCountries()', () => {
    it('should get the countries from state', () => {
      const expectedResult = mockState.entities.countries;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCountries(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountry()', () => {
    it('should get the country from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCountry(mockState, countryId)).toBe(countryEntity);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnOptions()', () => {
    it('should get the return options from state', () => {
      const expectedResult = mockState.entities.returnOptions;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getReturnOptions(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnOption()', () => {
    it('should get the return option from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getReturnOption(mockState, returnOptionId)).toBe(
        returnOptionEntity,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnOptionsFromOrder()', () => {
    it('should get the return options from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getReturnOptionsFromOrder(mockState, orderId, merchantId),
      ).toEqual([returnOptionEntity]);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getMerchantsFromOrder()', () => {
    it('should get the merchants from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getMerchantsFromOrder(mockState, orderId)).toEqual([
        merchantEntity,
      ]);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOrderItemsByOrder()', () => {
    it('should get the order items by order from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrderItemsByOrder(mockState, orderId)).toEqual([
        orderItemEntity,
      ]);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOrderItemsByMerchant()', () => {
    it('should get the order items by merchant from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getOrderItemsByMerchant(mockState, orderId)).toEqual({
        [merchantId]: [orderItemEntity],
      });
      expect(spy).toHaveBeenCalledTimes(2);
    });
    it('should get undefined if there are no orderDetails from that order', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getOrderItemsByMerchant(mockState, 'randomOrderId'),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOrderItemsByMerchant() when order merchants are split by merchantOrderCode', () => {
    it('should get the order items by merchant from state when order merchants are split by merchantOrderCode', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getOrderItemsByMerchant(
          mockStateSplitByMerchantOrderCode,
          orderId,
        ),
      ).toEqual({
        [merchantId]: [orderItemEntity],
        [merchantId2]: [orderItemEntity],
      });
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOrderItemQuantity()', () => {
    it('should get the order item quantity as undefined from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      const newState = {
        entities: {
          orders: { [`${orderId}`]: omit(orderEntity, 'items') },
        },
      };

      expect(
        selectors.getOrderItemQuantity(newState, orderId, orderItemId),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should get the order item quantity from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getOrderItemQuantity(mockState, orderId, orderItemId),
      ).toBe(1);
      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should get undefined if the order was not fetched', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getOrderItemQuantity(mockState, 'randomOrderId', orderItemId),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });

  describe('getOrderShipments()', () => {
    it('should get the order summaries', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');
      const expectedResult = [
        {
          id: orderId,
          ...orderEntitySplitByMerchantOrderCode.byMerchant[merchantId][
            merchantOrderCode
          ],
          orderItems: [orderItemEntity],
        },
        {
          id: orderId,
          ...orderEntitySplitByMerchantOrderCode.byMerchant[merchantId2][
            merchantOrderCode2
          ],
          orderItems: [orderItemEntity],
        },
      ];

      expect(
        selectors.getOrderShipments(mockStateSplitByMerchantOrderCode, orderId),
      ).toEqual(expectedResult);

      expect(spy).toHaveBeenCalledTimes(3);
    });
    it('should get undefined if there are no orderDetails from that order', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getOrderShipments(
          mockStateSplitByMerchantOrderCode,
          'randomOrderId',
        ),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
