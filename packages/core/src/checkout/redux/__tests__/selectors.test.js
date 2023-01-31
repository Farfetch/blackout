import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import mockState, {
  checkoutDetailEntity,
  checkoutEntity,
  checkoutId,
  checkoutOrderEntity,
  checkoutOrderId,
  checkoutOrderItemEntity,
  checkoutOrderItemId,
  deliveryBundleId,
  deliveryBundlesEntity,
  deliveryBundleUpgradeId_1,
  deliveryBundleUpgradesEntity,
  itemId1,
  productId,
  shippingOption,
} from '../__fixtures__/checkoutSelector.fixtures';

describe('checkout redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCheckoutShippingOptions()', () => {
    it('should get the checkout shipping options', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(selectors.getCheckoutShippingOptions(mockState)).toEqual(
        checkoutEntity.shippingOptions,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundle()', () => {
    it('should get the checkout delivery bundle by id', () => {
      expect(
        selectors.getCheckoutDeliveryBundle(mockState, deliveryBundleId),
      ).toEqual(deliveryBundlesEntity[deliveryBundleId]);
    });
  });

  describe('getCheckoutDeliveryBundlesIds()', () => {
    it('should get the checkout delivery bundles', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(selectors.getCheckoutDeliveryBundlesIds(mockState)).toEqual(
        checkoutEntity.deliveryBundles,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundles()', () => {
    it('should get the checkout delivery bundles', () => {
      expect(selectors.getCheckoutDeliveryBundles(mockState)).toEqual([
        deliveryBundlesEntity[deliveryBundleId],
      ]);
    });
  });

  describe('getCheckoutSelectedDeliveryBundleId()', () => {
    it('should get the selected checkout delivery bundle id', () => {
      expect(selectors.getCheckoutSelectedDeliveryBundleId(mockState)).toBe(
        deliveryBundleId,
      );
    });
  });

  describe('getCheckoutDeliveryBundleUpgrades()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getCheckoutDeliveryBundleUpgrades(
          mockState,
          deliveryBundleId,
        ),
      ).toEqual(deliveryBundleUpgradesEntity[deliveryBundleId]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundleUpgrade()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getCheckoutDeliveryBundleUpgrade(
          mockState,
          deliveryBundleId,
          itemId1,
          'Estimated',
          deliveryBundleUpgradeId_1,
        ),
      ).toEqual({
        id: deliveryBundleUpgradeId_1,
        name: 'Fast',
        itemId: itemId1,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutId()', () => {
    it('should get the checkout id property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(selectors.getCheckoutId(mockState)).toEqual(checkoutId);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckout()', () => {
    it('should get the checkout from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCheckout(mockState)).toEqual(checkoutEntity);
      expect(spy).toHaveBeenCalledWith(mockState, 'checkout', checkoutId);
    });
  });

  describe('getCheckoutDetail()', () => {
    it('should get the checkoutdetails from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCheckoutDetail(mockState)).toEqual(
        checkoutDetailEntity,
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'checkoutDetails',
        checkoutId,
      );
    });
  });

  describe('getCheckoutOrder()', () => {
    it('should get the checkout order from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCheckoutOrder(mockState)).toEqual(
        checkoutOrderEntity,
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'checkoutOrders',
        checkoutOrderId,
      );
    });
  });

  describe('getCheckoutOrderItem()', () => {
    const expectedResult = { ...checkoutOrderItemEntity };

    it('should return all data regarding a checkout order item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getCheckoutOrderItem(mockState, checkoutOrderItemId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'checkoutOrderItems',
        checkoutOrderItemId,
      );
    });
  });

  describe('getCheckoutOrderItemsIds()', () => {
    it("should return a list of checkout order item id's from state", () => {
      const expectedResult = checkoutOrderEntity.items;

      expect(selectors.getCheckoutOrderItemsIds(mockState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined', () => {
      const state = {
        ...mockState,
        entities: { checkoutOrders: { id: checkoutOrderId } },
      };

      expect(selectors.getCheckoutOrderItemsIds(state)).toBeUndefined();
    });
  });

  describe('getCheckoutOrderItems()', () => {
    it('should return the checkout order items content from state', () => {
      const expectedResult = [
        {
          ...mockState.entities.checkoutOrderItems[checkoutOrderItemId],
        },
      ];

      expect(selectors.getCheckoutOrderItems(mockState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getCheckoutOrderItemProduct()', () => {
    it('should return the checkout order item product content from state', () => {
      const expectedResult =
        mockState.entities.checkoutOrderItemProducts[productId];

      expect(
        selectors.getCheckoutOrderItemProduct(mockState, checkoutOrderItemId),
      ).toEqual(expectedResult);
    });
  });

  describe('getCheckoutOrderCollectPoints()', () => {
    it('should return the checkout order collect points content from state', () => {
      const expectedResult = checkoutOrderEntity.collectpoints;

      expect(selectors.getCheckoutOrderCollectPoints(mockState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getCheckoutOrderSelectedCollectPoint()', () => {
    it('should return the checkout order selected collect point from state', () => {
      const expectedResult = checkoutOrderEntity.clickAndCollect;

      expect(selectors.getCheckoutOrderSelectedCollectPoint(mockState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getCheckoutShippingOptions()', () => {
    it('should return the checkout shipping options from state', () => {
      const expectedResult = checkoutEntity.shippingOptions;

      expect(selectors.getCheckoutShippingOptions(mockState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getCheckoutCollectPointEstimatedDeliveryPeriod()', () => {
    it('should return an object with the "start" and "end" date for the estimated delivery period when there is a merchant location id defined', () => {
      const expectedResult = {
        start: shippingOption.shippingService.minEstimatedDeliveryHour,
        end: shippingOption.shippingService.maxEstimatedDeliveryHour,
      };

      expect(
        selectors.getCheckoutCollectPointEstimatedDeliveryPeriod(mockState),
      ).toEqual(expectedResult);
    });

    it('should return an object with the start and end date as NULL as a default, when there is no shipping option defined', () => {
      const expectedResult = {
        start: null,
        end: null,
      };

      expect(
        selectors.getCheckoutCollectPointEstimatedDeliveryPeriod({
          ...mockState,
          entities: {
            ...mockState.entities,
            checkout: {
              ...mockState.entities.checkout,
              [checkoutId]: {
                shippingOptions: [],
              },
            },
          },
        }),
      ).toEqual(expectedResult);
    });

    it('should NOT return any data in case the selected collect point hasnt got a merchant location id defined', () => {
      expect(
        selectors.getCheckoutCollectPointEstimatedDeliveryPeriod({
          ...mockState,
          entities: {
            ...mockState.entities,
            checkoutOrders: {
              ...mockState.entities.checkoutOrders,
              [checkoutOrderId]: {
                ...mockState.entities.checkoutOrders[checkoutOrderId],
                clickAndCollect: {
                  id: 999,
                  merchantLocationId: undefined,
                },
              },
            },
          },
        }),
      ).toBe(undefined);
    });
  });

  describe('getCheckoutError()', () => {
    it('should get the checkout error property from state', () => {
      const expectedResult = mockState.checkout.error;
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getCheckoutError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isCheckoutLoading()', () => {
    it('should get the checkout loading status from state', () => {
      const expectedResult = mockState.checkout.isLoading;
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isCheckoutLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCharges()', () => {
    it('should get the charges property from state', () => {
      const expectedResult = mockState.checkout.charges;
      const spy = jest.spyOn(fromReducer, 'getCharges');

      expect(selectors.getCharges(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getChargesError()', () => {
    it('should get the charges error property from state', () => {
      const expectedResult = mockState.checkout.charges.error;
      const spy = jest.spyOn(fromReducer, 'getCharges');

      expect(selectors.getChargesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isChargesLoading()', () => {
    it('should get the charges loading status from state', () => {
      const expectedResult = mockState.checkout.charges.isLoading;
      const spy = jest.spyOn(fromReducer, 'getCharges');

      expect(selectors.isChargesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBundleDeliveryWindow()', () => {
    it('should get the min and max delivery window dates for a bundle', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '2020-02-09T14:38:22.228Z',
        maxEstimatedDeliveryDate: '2020-02-14T14:38:22.228Z',
      };
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getBundleDeliveryWindow(mockState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get an empty array for wrong bundle id', () => {
      const expectedResult = undefined;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getBundleDeliveryWindow(mockState, 87879)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return an object with estimatedDeliveryDates as empty string', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '',
        maxEstimatedDeliveryDate: '',
      };
      const newState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          deliveryBundles: {
            ...deliveryBundlesEntity,
            [deliveryBundleId]: {
              ...deliveryBundlesEntity[deliveryBundleId],
              itemsDeliveryOptions: [],
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getBundleDeliveryWindow(newState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sub-areas selectors', () => {
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

    describe('sub-areas loading selectors', () => {
      it.each(subAreaNames)('should handle is%sLoading selector', subArea => {
        const selectorName = `is${subArea}Loading`;
        expect(selectors[selectorName](mockState)).toEqual(false);
      });
    });

    describe('sub-areas error selectors', () => {
      it.each(subAreaNames)('should handle get%sError selector', subArea => {
        const selectorName = `get${subArea}Error`;
        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);
        const expectedResult = mockState.checkout[reducerSubAreaName].error;

        expect(selectors[selectorName](mockState)).toBe(expectedResult);
      });
    });

    describe('sub-areas result selectors', () => {
      it.each(['Charges'])('should handle get%sResult selector', subArea => {
        const selectorName = `get${subArea}Result`;
        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);
        const expectedResult = mockState.checkout[reducerSubAreaName].result;

        expect(selectors[selectorName](mockState)).toBe(expectedResult);
      });
    });
  });
});
