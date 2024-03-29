import * as bagActionTypes from '../../../bags/actionTypes.js';
import { analyticsBagMiddleware } from '../bag.js';
import { bagMockData } from 'tests/__fixtures__/analytics/bag/bag.fixtures.mjs';
import { getBagItem } from '../../../bags/selectors.js';
import { getBrand } from '../../../brands/selectors.js';
import { getCategory } from '../../../categories/selectors/index.js';
import { getProduct } from '../../../products/selectors/product.js';
import { merge } from 'lodash-es';
import { mockStore } from '../../../../tests/index.js';
import Analytics, {
  EventType,
  FromParameterType,
  utils,
} from '@farfetch/blackout-analytics';
import type {
  BagItemEntity,
  ProductEntity,
} from '../../../entities/types/index.js';
import type { SizeAdapted, StoreState } from '../../../types/index.js';

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
const { price, quantity } = bagItem!;
const {
  includingTaxes: priceWithDiscount,
  includingTaxesWithoutDiscount: priceWithoutDiscount,
} = price!;

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

      expect(loggerErrorSpy).toHaveBeenCalled();
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

      expect(trackSpy).toHaveBeenCalledWith(EventType.ProductAddedToCart, {
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
        sizeId: sizes[0]?.id,
        sizeScaleId: sizes[0]?.scale,
        sku,
        value,
        variant: colorName,
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

      expect(trackSpy).toHaveBeenCalledWith(EventType.ProductRemovedFromCart, {
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
        sizeId: sizes[0]?.id,
        sizeScaleId: sizes[0]?.scale,
        value,
        variant: colorName,
      });
    });
  });

  describe('Update item in bag', () => {
    it('Should call `analytics.track(EventType.ProductRemovedFromCart)` with the correct payload if new quantity is less than old quantity', async () => {
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

      expect(trackSpy).toHaveBeenCalledWith(EventType.ProductRemovedFromCart, {
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
        sizeId: sizes[0]?.id,
        sizeScaleId: sizes[0]?.scale,
        oldSize: sizes[0]?.name,
        oldSizeId: sizes[0]?.id,
        oldSizeScaleId: sizes[0]?.scale,
        variant: colorName,
      });
    });

    it('Should call `analytics.track(EventType.ProductAddedToCart)` with the correct payload if new quantity is higher than old quantity', async () => {
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

      expect(trackSpy).toHaveBeenCalledWith(EventType.ProductAddedToCart, {
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
        sizeId: sizes[0]?.id,
        sizeScaleId: sizes[0]?.scale,
        oldSize: sizes[0]?.name,
        oldSizeId: sizes[0]?.id,
        oldSizeScaleId: sizes[0]?.scale,
        variant: colorName,
      });
    });

    it('should trigger only ProductUpdated event when it changed size event, with sizeId property assigned on event payload.', async () => {
      const size = {
        ...(bagMockData.mockSizes[1] as SizeAdapted),
        id: 999,
        name: 'XXL',
      };

      const bagItem = bagMockData.mockBagItem().getItem({ size });

      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagItem.id]: bagItem,
            },
          },
        },
        meta: {
          productId: bagItem.product,
          size: size.id,
          from: FromParameterType.Bag,
        },
      });

      // expect analytics ProductUpdated event to be triggered
      expect(trackSpy).toHaveBeenCalledWith(
        EventType.ProductUpdated,
        expect.objectContaining({ sizeId: size.id }),
      );
    });

    it('should trigger ProductUpdated and ProductAddedToCart when quantity changes on bag', async () => {
      const size = {
        ...(bagMockData.mockSizes[1] as SizeAdapted),
        id: 999,
        name: 'XXL',
      };

      const bagItem = bagMockData.mockBagItem().getItem({ size });

      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagItem.id]: { ...bagItem, quantity: bagItem.quantity + 1 },
            },
          },
        },
        meta: {
          productId: bagItem.product,
          quantity: bagItem.quantity + 1,
          from: FromParameterType.Bag,
        },
      });

      // expect trigger analytics product updated event
      expect(trackSpy).toHaveBeenNthCalledWith(
        1,
        EventType.ProductUpdated,
        expect.objectContaining({
          oldQuantity: bagItem.quantity,
          quantity: bagItem.quantity + 1,
        }),
      );
      expect(trackSpy).toHaveBeenNthCalledWith(
        2,
        EventType.ProductAddedToCart,
        expect.objectContaining({
          quantity: 1,
        }),
      );
    });

    it('should trigger ProductAddedToCart when quantity changes from PDP', async () => {
      const size = {
        ...(bagMockData.mockSizes[1] as SizeAdapted),
        id: 999,
        name: 'XXL',
      };

      const bagItem = bagMockData.mockBagItem().getItem({ size });

      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: bagMockData.mockBagId },
          entities: {
            bagItems: {
              [bagItem.id]: { ...bagItem, quantity: bagItem.quantity + 1 },
            },
          },
        },
        meta: {
          productId: bagItem.product,
          quantity: bagItem.quantity + 1,
          from: FromParameterType.Pdp,
        },
      });

      // expect trigger analytics product updated event
      expect(trackSpy).toHaveBeenNthCalledWith(
        1,
        EventType.ProductAddedToCart,
        expect.objectContaining({
          quantity: 1,
        }),
      );
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

      expect(trackSpy).toHaveBeenCalledTimes(1);
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
          from: FromParameterType.Bag,
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
        oldQuantity,
        oldSize: sizes[0]?.name,
        oldSizeId: sizes[0]?.id,
        oldSizeScaleId: sizes[0]?.scale,
        price: productData?.price?.includingTaxes,
        priceWithoutDiscount: productData?.price?.includingTaxesWithoutDiscount,
        quantity: 1,
        size: sizes[0]?.name,
        sizeId: sizes[0]?.id,
        sizeScaleId: sizes[0]?.scale,
        sku,
        variant: colorName,
        from: FromParameterType.Bag,
      };

      // expect trigger analytics product updated event
      expect(trackSpy).toHaveBeenCalledWith(
        EventType.ProductUpdated,
        expectedData,
      );

      // expect trigger analytics product removed event
      const expectedRemovedFromCartData = {
        ...expectedData,
        oldQuantity: undefined,
        quantity: 2,
      };

      expect(trackSpy).toHaveBeenCalledWith(
        EventType.ProductRemovedFromCart,
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

      expect(trackSpy).toHaveBeenCalledTimes(1);
    });
  });
});
