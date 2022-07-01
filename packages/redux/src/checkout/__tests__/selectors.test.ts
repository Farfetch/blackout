import * as fromEntities from '../../entities/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  checkoutDetailEntity,
  checkoutEntity,
  checkoutOrderEntity,
  checkoutOrderItemEntity,
  deliveryBundleId,
  deliveryBundlesEntity,
  deliveryBundleUpgradeId_1,
  deliveryBundleUpgradesEntity,
  itemId1,
  mockCheckoutState,
  operation,
  productId,
  shippingOption,
} from 'tests/__fixtures__/checkout';
import type { StoreState } from '@farfetch/blackout-redux';

describe('checkout redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCheckoutShippingOptions()', () => {
    it('should get the checkout shipping options', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(selectors.getCheckoutShippingOptions(mockCheckoutState)).toEqual(
        checkoutEntity.shippingOptions,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundle()', () => {
    it('should get the checkout delivery bundle by id', () => {
      expect(
        selectors.getCheckoutDeliveryBundle(
          mockCheckoutState,
          deliveryBundleId,
        ),
      ).toEqual(deliveryBundlesEntity[deliveryBundleId]);
    });
  });

  describe('getCheckoutDeliveryBundlesIds()', () => {
    it('should get the checkout delivery bundles', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(
        selectors.getCheckoutDeliveryBundlesIds(mockCheckoutState),
      ).toEqual(checkoutEntity.deliveryBundles);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundles()', () => {
    it('should get the checkout delivery bundles', () => {
      expect(selectors.getCheckoutDeliveryBundles(mockCheckoutState)).toEqual([
        deliveryBundlesEntity[deliveryBundleId],
      ]);
    });
  });

  describe('getCheckoutSelectedDeliveryBundleId()', () => {
    it('should get the selected checkout delivery bundle id', () => {
      expect(
        selectors.getCheckoutSelectedDeliveryBundleId(mockCheckoutState),
      ).toBe(deliveryBundleId);
    });
  });

  describe('getCheckoutDeliveryBundleUpgrades()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutDeliveryBundleUpgrades(
          mockCheckoutState,
          deliveryBundleId,
        ),
      ).toEqual(deliveryBundleUpgradesEntity[deliveryBundleId]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutDeliveryBundleUpgrade()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutDeliveryBundleUpgrade(
          mockCheckoutState,
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

      expect(selectors.getCheckoutId(mockCheckoutState)).toEqual(
        checkoutEntity['id'],
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckout()', () => {
    it('should get the checkout from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCheckout(mockCheckoutState)).toEqual(checkoutEntity);
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkout',
        checkoutEntity['id'],
      );
    });
  });

  describe('getCheckoutDetail()', () => {
    it('should get the checkoutdetails from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCheckoutDetail(mockCheckoutState)).toEqual(
        checkoutDetailEntity,
      );
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkoutDetails',
        checkoutEntity['id'],
      );
    });
  });

  describe('getCheckoutOrder()', () => {
    it('should get the checkout order from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCheckoutOrder(mockCheckoutState)).toEqual(
        checkoutOrderEntity,
      );
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkoutOrders',
        checkoutEntity['checkoutOrder'],
      );
    });
  });

  describe('getCheckoutOrderItem()', () => {
    const expectedResult = checkoutOrderItemEntity;

    it('should return all data regarding a checkout order item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderItem(
          mockCheckoutState,
          checkoutOrderItemEntity['id'],
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkoutOrderItems',
        checkoutOrderItemEntity['id'],
      );
    });
  });

  describe('getCheckoutOrderItemsIds()', () => {
    it("should return a list of checkout order item id's from state", () => {
      const expectedResult = checkoutOrderEntity.items;

      expect(selectors.getCheckoutOrderItemsIds(mockCheckoutState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined', () => {
      const state = {
        ...mockCheckoutState,
        entities: { checkoutOrders: { id: checkoutEntity['checkoutOrder'] } },
      };

      expect(selectors.getCheckoutOrderItemsIds(state)).toBeUndefined();
    });
  });

  describe('getCheckoutOrderItems()', () => {
    it('should return the checkout order items content from state', () => {
      const expectedResult = [checkoutOrderItemEntity];

      expect(selectors.getCheckoutOrderItems(mockCheckoutState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getCheckoutOrderItemProduct()', () => {
    it('should return the checkout order item product content from state', () => {
      const expectedResult =
        mockCheckoutState.entities.checkoutOrderItemProducts[productId];

      expect(
        selectors.getCheckoutOrderItemProduct(
          mockCheckoutState,
          checkoutOrderItemEntity['id'],
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getCheckoutOrderCollectPoints()', () => {
    it('should return the checkout order collect points content from state', () => {
      const expectedResult = checkoutOrderEntity.collectpoints;

      expect(
        selectors.getCheckoutOrderCollectPoints(mockCheckoutState),
      ).toEqual(expectedResult);
    });
  });

  describe('getCheckoutOrderSelectedCollectPoint()', () => {
    it('should return the checkout order selected collect point from state', () => {
      const expectedResult = checkoutOrderEntity.clickAndCollect;

      expect(
        selectors.getCheckoutOrderSelectedCollectPoint(mockCheckoutState),
      ).toEqual(expectedResult);
    });
  });

  describe('getCheckoutShippingOptions()', () => {
    it('should return the checkout shipping options from state', () => {
      const expectedResult = checkoutEntity.shippingOptions;

      expect(selectors.getCheckoutShippingOptions(mockCheckoutState)).toEqual(
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
        selectors.getCheckoutCollectPointEstimatedDeliveryPeriod(
          mockCheckoutState,
        ),
      ).toEqual(expectedResult);
    });

    it('should return an object with the start and end date as NULL as a default, when there is no shipping option defined', () => {
      const expectedResult = {
        start: null,
        end: null,
      };

      expect(
        selectors.getCheckoutCollectPointEstimatedDeliveryPeriod({
          ...mockCheckoutState,
          entities: {
            ...mockCheckoutState.entities,
            checkout: {
              ...mockCheckoutState.entities.checkout,
              [checkoutEntity['id']]: {
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
          ...mockCheckoutState,
          entities: {
            ...mockCheckoutState.entities,
            checkoutOrders: {
              ...mockCheckoutState.entities.checkoutOrders,
              [checkoutEntity['checkoutOrder']]: {
                ...mockCheckoutState.entities.checkoutOrders[
                  checkoutEntity['checkoutOrder']
                ],
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
      const expectedResult = mockCheckoutState.checkout.error;
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getCheckoutError(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isCheckoutLoading()', () => {
    it('should get the checkout loading status from state', () => {
      const expectedResult = mockCheckoutState.checkout.isLoading;
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isCheckoutLoading(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutOrderCharge()', () => {
    it('should get the checkoutOrderCharge property from state', () => {
      const expectedResult = mockCheckoutState.checkout.checkoutOrderCharge;
      const spy = jest.spyOn(fromReducer, 'getCheckoutOrderCharge');

      expect(selectors.getCheckoutOrderCharge(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutOrderChargeError()', () => {
    it('should get the checkoutOrderCharge error property from state', () => {
      const expectedResult =
        mockCheckoutState.checkout.checkoutOrderCharge.error;
      const spy = jest.spyOn(fromReducer, 'getCheckoutOrderCharge');

      expect(selectors.getCheckoutOrderChargeError(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isCheckoutOrderChargeLoading()', () => {
    it('should get the checkoutOrderCharge loading status from state', () => {
      const expectedResult =
        mockCheckoutState.checkout.checkoutOrderCharge.isLoading;
      const spy = jest.spyOn(fromReducer, 'getCheckoutOrderCharge');

      expect(selectors.isCheckoutOrderChargeLoading(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBundleDeliveryWindow()', () => {
    it('should get the min and max delivery window dates for a bundle', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '2020-02-09T14:38:22.228Z',
        maxEstimatedDeliveryDate: '2020-02-14T14:38:22.228Z',
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getBundleDeliveryWindow(mockCheckoutState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get an empty array for wrong bundle id', () => {
      const expectedResult = undefined;
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getBundleDeliveryWindow(mockCheckoutState, 87879)).toBe(
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
        ...mockCheckoutState,
        entities: {
          ...mockCheckoutState.entities,
          deliveryBundles: {
            ...deliveryBundlesEntity,
            [deliveryBundleId]: {
              ...deliveryBundlesEntity[deliveryBundleId],
              itemsDeliveryOptions: [],
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getBundleDeliveryWindow(newState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return an object with estimatedDeliveryDates as empty string when no deliveryWindow', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '',
        maxEstimatedDeliveryDate: '',
      };
      const newState = {
        ...mockCheckoutState,
        entities: {
          ...mockCheckoutState.entities,
          deliveryBundles: {
            ...deliveryBundlesEntity,
            [deliveryBundleId]: {
              ...deliveryBundlesEntity[deliveryBundleId],
              itemsDeliveryOptions: [
                {
                  itemId: 0,
                  name: 'Standard',
                },
                {
                  itemId: 1,
                  name: 'Standard',
                },
              ],
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getBundleDeliveryWindow(newState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return an object with estimatedDeliveryDates as empty string when only one itemDeliveryOption has deliveryWindow', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '2020-02-09T14:38:22.228Z',
        maxEstimatedDeliveryDate: '2020-02-13T14:38:22.228Z',
      };
      const newState = {
        ...mockCheckoutState,
        entities: {
          ...mockCheckoutState.entities,
          deliveryBundles: {
            ...deliveryBundlesEntity,
            [deliveryBundleId]: {
              ...deliveryBundlesEntity[deliveryBundleId],
              itemsDeliveryOptions: [
                {
                  itemId: 0,
                  name: 'Standard',
                  deliveryWindow: {
                    type: 'Estimated',
                    min: '2020-02-09T14:38:22.228Z',
                    max: '2020-02-13T14:38:22.228Z',
                  },
                },
                {
                  itemId: 1,
                  name: 'Standard',
                },
              ],
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getBundleDeliveryWindow(newState, deliveryBundleId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'CheckoutDetails',
      'CollectPoints',
      'ItemTags',
      'PromoCode',
      'Tags',
      'GiftMessage',
      'CheckoutOrderCharge',
      'DeliveryBundleUpgrades',
      'ItemDeliveryProvisioning',
      'UpgradeItemDeliveryProvisioning',
    ];

    describe('sub-areas loading selectors', () => {
      it.each(subAreaNames)('should handle is%sLoading selector', subArea => {
        let selectorName = `is${subArea}Loading`;

        if (!selectors[selectorName]) {
          selectorName = `are${subArea}Loading`;
        }

        expect(selectors[selectorName](mockCheckoutState)).toEqual(false);
      });
    });

    describe('sub-areas error selectors', () => {
      it.each(subAreaNames)('should handle get%sError selector', subArea => {
        const selectorName = `get${subArea}Error`;
        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);
        const expectedResult =
          mockCheckoutState.checkout[reducerSubAreaName].error;

        expect(selectors[selectorName](mockCheckoutState)).toBe(expectedResult);
      });
    });

    describe('sub-areas result selectors', () => {
      it.each(['CheckoutOrderCharge'])(
        'should handle get%sResult selector',
        subArea => {
          const selectorName = `get${subArea}Result`;
          const reducerSubAreaName =
            subArea.charAt(0).toLowerCase() + subArea.slice(1);
          const expectedResult =
            mockCheckoutState.checkout[reducerSubAreaName].result;

          expect(selectors[selectorName](mockCheckoutState)).toBe(
            expectedResult,
          );
        },
      );
    });
  });

  describe('operation selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    beforeEach(() => {
      state = {
        checkout: {
          operation: {
            isLoading: true,
            error: null,
          },
        },
      };
    });

    it('should return loading status', () => {
      expect(selectors.isOperationLoading(state as StoreState)).toBe(true);
    });

    it('should return error', () => {
      expect(selectors.getOperationError(state as StoreState)).toBeNull();
    });
  });

  describe('operations selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    beforeEach(() => {
      state = {
        checkout: {
          operations: {
            isLoading: true,
            error: null,
            result: {
              entries: [operation.id],
              number: 2,
              totalItems: 60,
              totalPages: 3,
            },
          },
        },
      };
    });

    it('should return loading status', () => {
      expect(selectors.isOperationsLoading(state as StoreState)).toBe(true);
    });

    it('should return error', () => {
      expect(selectors.getOperationsError(state as StoreState)).toBeNull();
    });

    it('should return pagination object', () => {
      expect(selectors.getOperationsPagination(state as StoreState)).toBe(
        state.checkout?.operations?.result,
      );
    });
  });

  describe('removeOrderItem selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    beforeEach(() => {
      state = {
        checkout: {
          removeOrderItem: {
            isLoading: true,
            error: null,
          },
        },
      };
    });

    it('should return loading status', () => {
      expect(selectors.isRemoveOrderItemLoading(state as StoreState)).toBe(
        true,
      );
    });

    it('should return error', () => {
      expect(selectors.getRemoveOrderItemError(state as StoreState)).toBeNull();
    });
  });

  describe('updateOrderItem selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    beforeEach(() => {
      state = {
        checkout: {
          updateOrderItem: {
            isLoading: true,
            error: null,
          },
        },
      };
    });

    it('should return loading status', () => {
      expect(selectors.isUpdateOrderItemLoading(state as StoreState)).toBe(
        true,
      );
    });

    it('should return error', () => {
      expect(selectors.getUpdateOrderItemError(state as StoreState)).toBeNull();
    });
  });
});
