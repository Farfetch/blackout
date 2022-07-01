import * as bagActionTypes from '../../../bags/actionTypes';
import { analyticsBagMiddleware } from '../bag';
import { bagMockData } from 'tests/__fixtures__/analytics/bag';
import { getBagItem } from '../../../bags/selectors';
import { getBrand, getCategory, getProduct } from '../../../entities/selectors';
import { mockStore as mockSimplifiedStore } from './../tests/simplifiedStore';
import { mockStore } from '../../../../tests';
import Analytics, { eventTypes, utils } from '@farfetch/blackout-analytics';
import merge from 'lodash/merge';
import type { BagItemEntity, ProductEntity } from '../../../entities/types';
import type { PriceAdapted } from '../../../helpers/adapters';
import type { StoreState } from '../../../types';

// Mock logger so it does not output to the console
jest.mock('@farfetch/blackout-analytics/utils', () => ({
  ...jest.requireActual('@farfetch/blackout-analytics/utils'),
  logger: {
    warn(message: string) {
      return message;
    },
    error(message: string) {
      return message;
    },
  },
}));

const analytics = new Analytics();
const trackSpy = jest.spyOn(analytics, 'track');
const loggerErrorSpy = jest.spyOn(utils.logger, 'error');
/**
 * Expected data to be asserted in tests \*
 */
const productData = getProduct(
  bagMockData.mockState,
  bagMockData.mockProductId,
) as ProductEntity;
const { name, shortDescription, sku } = productData;
const sizes = bagMockData.mockSizes;
const bagItem = getBagItem(bagMockData.mockState, bagMockData.mockBagItemId);
const { price, quantity } = bagItem;
const {
  includingTaxes: priceWithDiscount,
  includingTaxesWithoutDiscount: priceWithoutDiscount,
} = price as NonNullable<PriceAdapted>;

const affiliation = 'random';
const brandName = getBrand(
  bagMockData.mockState,
  bagMockData.mockBrandId,
)?.name;
const categoryName = getCategory(
  bagMockData.mockState,
  bagMockData.mockCategoryId,
)?.name;
const colorName = productData.colors.find(color =>
  color.tags.includes('DesignerColor'),
)?.color.name;
const coupon = 'super discount';
const currencyCode = 'USD';
const discount = priceWithoutDiscount - priceWithDiscount;
const from = 'bag';
const oldQuantity =
  bagMockData.mockState.entities?.bagItems?.[bagMockData.mockBagItemId]
    ?.quantity || 0;
const position = 3;
const value = priceWithDiscount;
const productDescription = shortDescription || name; // Color name must be the one that has a tag of 'DesignerColor'
const getMockState = (data: Record<string, unknown> = {}): StoreState =>
  merge({}, bagMockData.mockState, data);

describe('analyticsBagMiddleware', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(null, getMockState(), [
      analyticsBagMiddleware(analytics),
    ]);

    jest.clearAllMocks();

    analytics.useContext(() => ({
      currencyCode,
    }));
  });

  describe('When the store have incomplete data', () => {
    beforeEach(() => {
      store = mockStore(
        null,
        getMockState({
          entities: {
            products: {
              123: {},
            },
          },
        }),
        [analyticsBagMiddleware(analytics)],
      );
    });

    it('Should log an error if an analytics instance is not passed', () => {
      // @ts-expect-error test undefined value
      analyticsBagMiddleware(undefined);

      expect(loggerErrorSpy).toHaveBeenCalled();

      loggerErrorSpy.mockClear();

      // @ts-expect-error test instanceof
      analyticsBagMiddleware({});

      expect(loggerErrorSpy).toHaveBeenCalled();
    });

    it('Should not throw when a product does not exists on entities reducer', () => {
      expect(() =>
        store.dispatch({
          type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
          payload: {},
          meta: {
            productId: 345,
          },
        }),
      ).not.toThrow();
    });

    it('Should not throw errors if some product properties are not defined', () => {
      expect(() =>
        store.dispatch({
          type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
          payload: {},
          meta: {},
        }),
      ).not.toThrow();
    });

    it('Should not throw when product color tags are not defined', () => {
      expect(() =>
        store.dispatch({
          type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
          payload: {},
          meta: {
            productId: 123,
          },
        }),
      ).not.toThrow();
    });

    it('Should log an error if the currencyCode is not set in analytics context', async () => {
      // @ts-expect-error
      analytics.useContext(() => ({ currencyCode: null }));

      await store.dispatch({
        type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId: 123,
        },
      });

      expect(loggerErrorSpy).toBeCalled();
    });
  });

  describe('Add item to bag', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsBagMiddleware(analytics),
      ]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagMockData.mockBagItemId]: {
                id: bagMockData.mockBagItemId,
                product: bagMockData.mockProductId,
                size: { id: sizes[0]?.id },
              },
            },
          },
        },
        meta: {
          affiliation,
          coupon,
          discount,
          from,
          position,
          productId: bagMockData.mockProductId,
          quantity,
          size: sizes[0]?.id,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        affiliation,
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discount,
        from,
        id: bagMockData.mockProductId,
        name: productDescription,
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity,
        size: sizes[0]?.name,
        sku,
        variant: colorName,
        value,
      });
    });
  });

  describe('Remove item from bag', () => {
    let bagItem: BagItemEntity;

    beforeEach(() => {
      const mockState = getMockState();

      // Test promotions with a value greater than 0
      bagItem = merge(
        {},
        bagMockData.mockState?.entities?.bagItems?.[bagMockData.mockBagItemId],
      ) as BagItemEntity;
      bagItem.quantity = 5;
      bagItem.promotionDetail.totalDiscountValue = 100;

      // @ts-ignore this entity is defined, so ignore possible undefined value
      mockState.entities.bagItems[bagMockData.mockBagItemId] = bagItem;

      bagItem = mockState?.entities?.bagItems?.[
        bagMockData.mockBagItemId
      ] as BagItemEntity;

      bagItem.quantity = 5;
      bagItem.promotionDetail.totalDiscountValue = 291;

      store = mockStore(null, mockState, [analyticsBagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      const getValue = (value: number | null | undefined, defaultValue = 0) =>
        value || defaultValue;
      const discountIncludingPromotions =
        getValue(bagItem?.price?.includingTaxesWithoutDiscount) -
        getValue(bagItem?.price?.includingTaxes) +
        getValue(bagItem.promotionDetail.totalDiscountValue) / bagItem.quantity;

      await store.dispatch({
        type: bagActionTypes.REMOVE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
        },
        meta: {
          productId: bagMockData.mockProductId,
          quantity,
          size: sizes[0]?.id,
          bagItemId: bagMockData.mockBagItemId,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: bagMockData.mockProductId,
        name: productDescription,
        price: priceWithDiscount - discount,
        priceWithoutDiscount: priceWithoutDiscount,
        quantity,
        sku,
        size: sizes[0]?.name,
        value,
        variant: colorName,
      });
    });
  });

  describe('Update item in bag', () => {
    it('Should call `analytics.track(eventTypes.PRODUCT_REMOVED_FROM_CART)` with the correct payload if new quantity is less than old quantity', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagMockData.mockBagItemAlternativeId]: {
                id: bagMockData.mockBagItemAlternativeId,
                product: bagMockData.mockProductAlternativeId,
                size: { id: sizes[0]?.id },
              },
            },
          },
          bagItemId: bagMockData.mockBagItemAlternativeId,
        },
        meta: {
          productId: bagMockData.mockProductAlternativeId,
          quantity: 1,
          size: sizes[0]?.id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: bagMockData.mockProductAlternativeId,
        name: productDescription,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 2,
        sku,
        size: sizes[0]?.name,
        oldSize: sizes[0]?.name,
        variant: colorName,
      });
    });

    it('Should call `analytics.track(eventTypes.PRODUCT_ADDED_TO_CART)` with the correct payload if new quantity is higher than old quantity', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagMockData.mockBagItemId]: {
                id: bagMockData.mockBagItemId,
                product: bagMockData.mockProductId,
                size: { id: sizes[0]?.id },
              },
            },
          },
          bagItemId: bagMockData.mockBagItemId,
        },
        meta: {
          productId: bagMockData.mockProductId,
          quantity: 6,
          size: sizes[0]?.id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: bagMockData.mockProductId,
        name: productDescription,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 3,
        sku,
        size: sizes[0]?.name,
        oldSize: sizes[0]?.name,
        variant: colorName,
      });
    });

    it('Should track a remove and an add event if the product sizes changed', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsBagMiddleware } = require('../bag');

      const simplifiedStore = mockSimplifiedStore(bagMockData.mockState, [
        analyticsBagMiddleware(analytics),
      ]);

      await simplifiedStore.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagMockData.mockBagItem().id]: bagMockData
                .mockBagItem()
                .getItem({ size: bagMockData.mockSizes[1] }),
            },
          },
          bagItemId: bagMockData.mockBagItemId,
        },
        meta: {
          bagItemId: bagMockData.mockBagItemId,
          productId: bagMockData.mockProductId,
          quantity: 3,
          size: sizes[1]?.id,
        },
      });

      const baseData = {
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: bagMockData.mockProductId,
        name: productDescription,
        oldQuantity: 3,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 3,
        sku,
        size: sizes[1]?.name,
        variant: colorName,
        oldSize: sizes[0]?.name,
      };

      expect(trackSpy).nthCalledWith(1, eventTypes.PRODUCT_UPDATED, baseData);

      expect(trackSpy).nthCalledWith(2, eventTypes.PRODUCT_REMOVED_FROM_CART, {
        ...baseData,
        quantity: 3,
        size: sizes[0]?.name,
      });

      expect(trackSpy).nthCalledWith(3, eventTypes.PRODUCT_ADDED_TO_CART, {
        ...baseData,
        oldQuantity: undefined,
      });
    });
  });

  describe('Custom action types', () => {
    const myActionTypeAddToBag = 'myActionType.AddToBag';
    const myActionTypeUpdateBag = 'myActionType.UpdateBag';
    const myActionTypeRemoveFromBag = 'myActionType.RemoveFromBag';

    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsBagMiddleware(analytics, {
          ADD_BAG_ITEM_SUCCESS: myActionTypeAddToBag,
          UPDATE_BAG_ITEM_SUCCESS: myActionTypeUpdateBag,
          REMOVE_BAG_ITEM_SUCCESS: myActionTypeRemoveFromBag,
        }),
      ]);
    });
    it('should handle a custom action type for add to bag action', async () => {
      await store.dispatch({
        type: myActionTypeAddToBag,
        payload: {
          result: { id: bagMockData.mockBagId },
        },
        meta: {
          productId: bagMockData.mockProductId,
          quantity,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update bag action', async () => {
      const newQuantity = 1;
      await store.dispatch({
        type: myActionTypeUpdateBag,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: bagMockData.mockState?.entities?.bagItems,
          },
        },
        meta: {
          productId: bagMockData.mockProductId,
          quantity: newQuantity,
          size: sizes[0]?.id,
        },
      });

      const expectedData = {
        brand: brandName,
        cartId: bagMockData.mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: 0,
        id: bagMockData.mockProductId,
        name: productDescription,
        price: productData?.price?.includingTaxes,
        priceWithoutDiscount: productData?.price?.includingTaxesWithoutDiscount,
        oldQuantity,
        quantity: 1,
        size: sizes[0]?.name,
        oldSize: sizes[0]?.name,
        sku,
        variant: colorName,
      };

      // expect trigger analytics product updated event
      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_UPDATED, expectedData);

      // expect trigger analytics product removed event
      const expectedRemovedFromCartData = {
        ...expectedData,
        oldQuantity: undefined,
        quantity: 2,
      };
      expect(trackSpy).toBeCalledWith(
        eventTypes.PRODUCT_REMOVED_FROM_CART,
        expectedRemovedFromCartData,
      );
    });

    it('should handle a custom action type for remove from bag action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromBag,
        payload: {
          result: { id: bagMockData.mockBagId },
        },
        meta: {
          productId: bagMockData.mockProductId,
          quantity,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });
  });
});
