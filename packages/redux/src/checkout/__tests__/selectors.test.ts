import * as fromEntities from '../../entities/selectors/entity.js';
import * as fromReducer from '../reducer.js';
import * as selectors from '../selectors.js';
import {
  type BlackoutError,
  CheckoutOrderDeliveryWindowType,
} from '@farfetch/blackout-client';
import {
  checkoutEntity,
  checkoutId,
  checkoutOrderContext,
  checkoutOrderEntity,
  checkoutOrderItemId,
  contextId,
  deliveryBundleId,
  deliveryBundleId_2,
  deliveryBundlesEntity,
  deliveryBundleUpgradeId_1,
  deliveryBundleUpgradesEntity,
  itemId1,
  mockCheckoutDetailsEntityDenormalized,
  mockCheckoutOrderItemEntity,
  mockCheckoutOrderResultDenormalized,
  mockCheckoutState,
  mockCollectPointsResponse,
  operation,
  productId,
  shippingOption,
} from 'tests/__fixtures__/checkout/index.mjs';
import type { Nullable, StoreState } from '@farfetch/blackout-redux';

describe('checkout redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCheckoutOrderDeliveryBundle()', () => {
    it('should get the checkout delivery bundle by id', () => {
      expect(
        selectors.getCheckoutOrderDeliveryBundle(
          mockCheckoutState,
          deliveryBundleId,
        ),
      ).toEqual(deliveryBundlesEntity[deliveryBundleId]);
    });
  });

  describe('getCheckoutOrderDeliveryBundlesIds()', () => {
    it('should get the checkout delivery bundles', () => {
      expect(
        selectors.getCheckoutOrderDeliveryBundlesIds(mockCheckoutState),
      ).toEqual(checkoutEntity.deliveryBundles);
    });
  });

  describe('getCheckoutOrderDeliveryBundles()', () => {
    it('should get the checkout delivery bundles', () => {
      expect(
        selectors.getCheckoutOrderDeliveryBundles(mockCheckoutState),
      ).toEqual([
        deliveryBundlesEntity[deliveryBundleId],
        deliveryBundlesEntity[deliveryBundleId_2],
      ]);
    });
  });

  describe('getCheckoutOrderSelectedDeliveryBundleId()', () => {
    it('should get the selected checkout delivery bundle id', () => {
      expect(
        selectors.getCheckoutOrderSelectedDeliveryBundleId(mockCheckoutState),
      ).toBe(deliveryBundleId);
    });
  });

  describe('getCheckoutOrderDeliveryBundleUpgrades()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderDeliveryBundleUpgrades(
          mockCheckoutState,
          deliveryBundleId,
        ),
      ).toEqual(deliveryBundleUpgradesEntity[deliveryBundleId]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutOrderDeliveryBundleUpgrade()', () => {
    it('should get the checkout delivery bundle by id', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderDeliveryBundleUpgrade(
          mockCheckoutState,
          deliveryBundleId,
          itemId1,
          'Estimated',
          deliveryBundleUpgradeId_1,
        ),
      ).toEqual(
        deliveryBundleUpgradesEntity[deliveryBundleId][itemId1].Estimated[0],
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutOrderId()', () => {
    it('should get the checkout id property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getId');

      expect(selectors.getCheckoutOrderId(mockCheckoutState)).toEqual(
        checkoutEntity['id'],
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCheckoutOrderResult()', () => {
    it('should get the checkout from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCheckoutOrderResult(mockCheckoutState)).toEqual(
        mockCheckoutOrderResultDenormalized,
      );
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkout',
        checkoutEntity['id'],
      );
    });
  });

  describe('getCheckoutOrderDetails()', () => {
    it('should get the checkoutdetails from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCheckoutOrderDetails(mockCheckoutState)).toEqual(
        mockCheckoutDetailsEntityDenormalized,
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
      expect(selectors.getCheckoutOrder(mockCheckoutState)).toEqual(
        mockCheckoutOrderResultDenormalized.checkoutOrder,
      );
    });
  });

  describe('getCheckoutOrderItem()', () => {
    const expectedResult = mockCheckoutOrderItemEntity;

    it('should return all data regarding a checkout order item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderItem(mockCheckoutState, checkoutOrderItemId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockCheckoutState,
        'checkoutOrderItems',
        checkoutOrderItemId,
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
          checkoutOrderItemId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getCollectPoints()', () => {
    it('should return the collect points content from state when a query containing an orderId is passed', () => {
      const hash = `${checkoutId}|false|false`;

      const expectedResult =
        mockCheckoutState.checkout.collectPoints[hash]?.result;

      expect(
        selectors.getCollectPoints(mockCheckoutState, { orderId: checkoutId }),
      ).toEqual(expectedResult);
    });

    it('should return the collect points content from state when no query is passed', () => {
      const state = {
        ...mockCheckoutState,
        checkout: {
          ...mockCheckoutState.checkout,
          collectPoints: {
            '': {
              isLoading: false,
              result: mockCollectPointsResponse,
              error: null,
            },
          },
        },
      };

      const expectedResult = state.checkout.collectPoints[''].result;

      expect(selectors.getCollectPoints(state)).toEqual(expectedResult);
    });

    it('should return the collect points content from state when a query containing all values are passed', () => {
      const hash = `${checkoutId}|true|true`;

      const state = {
        ...mockCheckoutState,
        checkout: {
          ...mockCheckoutState.checkout,
          collectPoints: {
            [hash]: {
              isLoading: false,
              result: mockCollectPointsResponse,
              error: null,
            },
          },
        },
      };

      const expectedResult = state.checkout.collectPoints[hash]?.result;

      expect(
        selectors.getCollectPoints(state, {
          orderId: checkoutId,
          isClickAndCollectAvailable: true,
          isStockAvailable: true,
        }),
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

  describe('getCheckoutOrderShippingOptions()', () => {
    it('should return the checkout shipping options from state', () => {
      const expectedResult = checkoutEntity.shippingOptions;

      expect(
        selectors.getCheckoutOrderShippingOptions(mockCheckoutState),
      ).toEqual(expectedResult);
    });
  });

  describe('getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod()', () => {
    it('should return an object with the "start" and "end" date for the estimated delivery period when there is a merchant location id defined', () => {
      const expectedResult = {
        start: shippingOption.shippingService.minEstimatedDeliveryHour,
        end: shippingOption.shippingService.maxEstimatedDeliveryHour,
      };

      expect(
        selectors.getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod(
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
        selectors.getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod({
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
        selectors.getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod({
          ...mockCheckoutState,
          entities: {
            ...mockCheckoutState.entities,
            checkoutOrders: {
              ...mockCheckoutState.entities.checkoutOrders,
              [checkoutEntity['checkoutOrder']]: {
                ...mockCheckoutState.entities.checkoutOrders[
                  checkoutEntity[
                    'checkoutOrder'
                  ] as keyof typeof mockCheckoutState.entities.checkoutOrders
                ],
                clickAndCollect: {
                  id: 999,
                  merchantLocationId: undefined,
                },
              },
            },
          },
        }),
      ).toBeUndefined();
    });
  });

  describe('getCheckoutOrderError()', () => {
    it('should get the checkout error property from state', () => {
      const expectedResult = mockCheckoutState.checkout.error;
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getCheckoutOrderError(mockCheckoutState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isCheckoutOrderLoading()', () => {
    it('should get the checkout loading status from state', () => {
      const expectedResult = mockCheckoutState.checkout.isLoading;
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isCheckoutOrderLoading(mockCheckoutState)).toBe(
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

  describe('getCheckoutOrderDeliveryBundleWindow()', () => {
    it('should get the min and max delivery window dates for a bundle', () => {
      const expectedResult = {
        minEstimatedDeliveryDate: '2020-02-09T14:38:22.228Z',
        maxEstimatedDeliveryDate: '2020-02-14T14:38:22.228Z',
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderDeliveryBundleWindow(
          mockCheckoutState,
          deliveryBundleId,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get an empty array for wrong bundle id', () => {
      const expectedResult = undefined;
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getCheckoutOrderDeliveryBundleWindow(
          mockCheckoutState,
          '87879',
        ),
      ).toBe(expectedResult);
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
        selectors.getCheckoutOrderDeliveryBundleWindow(
          newState,
          deliveryBundleId,
        ),
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
        selectors.getCheckoutOrderDeliveryBundleWindow(
          // @ts-expect-error CheckoutOrderDeliveryWindow is not set on purpose in itemDeliveryOptions entries.
          newState,
          deliveryBundleId,
        ),
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
                    type: CheckoutOrderDeliveryWindowType.Estimated,
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
        selectors.getCheckoutOrderDeliveryBundleWindow(
          // @ts-expect-error CheckoutOrderDeliveryWindow is not set on purpose in itemDeliveryOptions entries.
          newState,
          deliveryBundleId,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'CheckoutOrderDetails',
      'CollectPoints',
      'CheckoutOrderItemTags',
      'CheckoutOrderPromocodes',
      'CheckoutOrderTags',
      'CheckoutOrderItems',
      'CheckoutOrderCharge',
      'CheckoutOrderDeliveryBundleUpgrades',
      'CheckoutOrderDeliveryBundleProvisioning',
      'CheckoutOrderDeliveryBundleUpgradeProvisioning',
    ];

    describe('sub-areas loading selectors', () => {
      it.each(subAreaNames)(
        'should handle (is|are)%sLoading|Updating selector',
        subArea => {
          let selectorName = `is${subArea}Loading`;

          if (!selectors[selectorName as keyof typeof selectors]) {
            selectorName = `are${subArea}Loading`;

            if (!selectors[selectorName as keyof typeof selectors]) {
              selectorName = `are${subArea}Updating`;
            }
          }

          expect(
            (
              selectors[selectorName as keyof typeof selectors] as (
                state: StoreState,
              ) => boolean
            )(mockCheckoutState),
          ).toBe(false);
        },
      );
    });

    describe('sub-areas error selectors', () => {
      it.each(subAreaNames)('should handle get%sError selector', subArea => {
        const selectorName = `get${subArea}Error`;
        let selector = selectors[selectorName as keyof typeof selectors];

        if (!selector) {
          selector =
            selectors[`get${subArea}UpdateError` as keyof typeof selectors];
        }

        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);

        const subAreaState = mockCheckoutState.checkout[
          reducerSubAreaName as keyof typeof mockCheckoutState.checkout
        ] as { error: Nullable<BlackoutError> };

        const expectedResult = subAreaState.error;

        expect(
          (selector as (state: StoreState) => Nullable<BlackoutError>)(
            mockCheckoutState,
          ),
        ).toBe(expectedResult);
      });
    });

    describe('sub-areas result selectors', () => {
      it.each(['CheckoutOrderCharge'])(
        'should handle get%sResult selector',
        subArea => {
          const selectorName = `get${subArea}Result` as keyof typeof selectors;
          const reducerSubAreaName =
            subArea.charAt(0).toLowerCase() + subArea.slice(1);

          const subAreaState = mockCheckoutState.checkout[
            reducerSubAreaName as keyof typeof mockCheckoutState.checkout
          ] as { result: unknown };

          const expectedResult = subAreaState.result;
          const selector = selectors[selectorName] as (
            state: StoreState,
          ) => unknown;

          expect(selector(mockCheckoutState)).toBe(expectedResult);
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
      expect(
        selectors.isCheckoutOrderOperationLoading(state as StoreState),
      ).toBe(true);
    });

    it('should return error', () => {
      expect(
        selectors.getCheckoutOrderOperationError(state as StoreState),
      ).toBeNull();
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
      expect(
        selectors.areCheckoutOrderOperationsLoading(state as StoreState),
      ).toBe(true);
    });

    it('should return error', () => {
      expect(
        selectors.getCheckoutOrderOperationsError(state as StoreState),
      ).toBeNull();
    });

    it('should return pagination object', () => {
      expect(
        selectors.getCheckoutOrderOperationsPagination(state as StoreState),
      ).toBe(state.checkout?.operations?.result);
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

  describe('context selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    it('should return loading status', () => {
      state = {
        ...mockCheckoutState,
        checkout: {
          context: {
            isLoading: true,
            error: null,
            result: null,
          },
        },
      };

      expect(selectors.isCheckoutOrderContextLoading(state as StoreState)).toBe(
        true,
      );
    });

    it('should return error', () => {
      const expectedResult = new Error('dummy error') as BlackoutError;

      state = {
        ...mockCheckoutState,
        checkout: {
          context: {
            isLoading: false,
            error: new Error('dummy error') as BlackoutError,
            result: null,
          },
        },
      };

      expect(
        selectors.getCheckoutOrderContextError(state as StoreState),
      ).toEqual(expectedResult);
    });

    it('should return the checkout order context', () => {
      expect(selectors.getCheckoutOrderContext(mockCheckoutState)).toEqual(
        checkoutOrderContext,
      );
    });
  });

  describe('contexts selectors', () => {
    let state: { checkout: Partial<StoreState['checkout']> };

    it('should return loading status', () => {
      state = {
        ...mockCheckoutState,
        checkout: {
          contexts: {
            isLoading: true,
            error: null,
            result: [],
          },
        },
      };

      expect(
        selectors.areCheckoutOrderContextsLoading(state as StoreState),
      ).toBe(true);
    });

    it('should return error', () => {
      const expectedResult = new Error('dummy error') as BlackoutError;

      state = {
        checkout: {
          contexts: {
            isLoading: false,
            error: new Error('dummy error') as BlackoutError,
            result: [],
          },
        },
      };

      expect(
        selectors.getCheckoutOrderContextsError(state as StoreState),
      ).toEqual(expectedResult);
    });

    it('should return the list of all checkout order contexts', () => {
      state = {
        ...mockCheckoutState,
        checkout: {
          contexts: {
            isLoading: true,
            error: null,
            result: [contextId],
          },
        },
      };

      expect(
        selectors.getCheckoutOrderContexts(state as StoreState),
      ).toStrictEqual([checkoutOrderContext]);
    });
  });
});
