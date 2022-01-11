import { actionTypes as bagActionTypes, getBagItem } from '../../../bags';
import { bagMiddleware } from '../../';
import { getBrand, getCategory, getProduct } from '../../../entities/selectors';
import {
  initialReduxState,
  mockBagId,
  mockBagItemId,
  mockBagProductId,
  mockBrandId,
  mockCategoryId,
  mockStore,
} from '../../../../tests';
import { logger } from '@farfetch/blackout-analytics/utils';
import Analytics, { eventTypes } from '@farfetch/blackout-analytics';
import merge from 'lodash/merge';

// Mock logger so it does not output to the console
jest.mock('@farfetch/blackout-analytics/utils', () => ({
  ...jest.requireActual('@farfetch/blackout-analytics/utils'),
  logger: {
    warn(message) {
      return message;
    },
    error(message) {
      return message;
    },
  },
}));

const analytics = new Analytics();
const trackSpy = jest.spyOn(analytics, 'track');
const loggerErrorSpy = jest.spyOn(logger, 'error');
/** Expected data to be asserted in tests **/
const productData = getProduct(initialReduxState, mockBagProductId);
const { name, shortDescription, sizes, sku } = productData;
const bagItem = getBagItem(initialReduxState, mockBagItemId);
const {
  price: {
    includingTaxes: priceWithDiscount,
    includingTaxesWithoutDiscount: priceWithoutDiscount,
  },
  quantity,
} = bagItem;
const affiliation = 'random';
const brandName = getBrand(initialReduxState, mockBrandId).name;
const categoryName = getCategory(initialReduxState, mockCategoryId).name;
const colorName = productData.colors.find(color =>
  color.tags.includes('DesignerColor'),
).color.name;
const coupon = 'super discount';
const currencyCode = 'USD';
const discount = priceWithoutDiscount - priceWithDiscount;
const from = 'bag';
const oldQuantity = 2;
const position = 3;
const value = priceWithDiscount;
const productDescription = shortDescription || name; // Color name must be the one that has a tag of 'DesignerColor'
const getMockState = data => merge({}, initialReduxState, data);

describe('bagMiddleware()', () => {
  let store;

  beforeEach(() => {
    store = mockStore(null, getMockState(), [bagMiddleware(analytics)]);

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
        [bagMiddleware(analytics)],
      );
    });

    it('Should log an error if an analytics instance is not passed', () => {
      // test undefined value
      bagMiddleware(undefined);

      expect(loggerErrorSpy).toHaveBeenCalled();

      loggerErrorSpy.mockClear();

      // test instanceof
      bagMiddleware({});

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

    it('Should log an error if the currencyCode is not set in analytics context', () => {
      analytics.setContext({
        currencyCode: null,
      });

      store.dispatch({
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
      const mockState = getMockState();

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
          entities: {
            bagItems: {
              [mockBagItemId]: {
                id: mockBagItemId,
                product: mockBagProductId,
                size: { id: sizes[0].id },
              },
            },
          },
        },
        meta: {
          affiliation,
          coupon,
          discount,
          from,
          oldQuantity,
          position,
          productId: mockBagProductId,
          quantity,
          size: sizes[0].id,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        affiliation,
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discount,
        from,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity,
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity,
        size: sizes[0].name,
        sku,
        variant: colorName,
        value,
      });
    });
  });

  describe('Remove item from bag', () => {
    let bagItem;

    beforeEach(() => {
      const mockState = getMockState();

      // Test promotions with a value greater than 0
      bagItem = merge({}, mockState.entities.bagItems[mockBagItemId]);
      bagItem.quantity = 5;
      bagItem.promotionDetail.totalDiscountValue = 100;
      mockState.entities.bagItems[mockBagItemId] = bagItem;

      bagItem = mockState.entities.bagItems[mockBagItemId];
      bagItem.quantity = 5;
      bagItem.promotionDetail.totalDiscountValue = 291;

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      const discountIncludingPromotions =
        bagItem.price.includingTaxesWithoutDiscount -
        bagItem.price.includingTaxes +
        bagItem.promotionDetail.totalDiscountValue / bagItem.quantity;

      await store.dispatch({
        type: bagActionTypes.REMOVE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity,
          quantity,
          size: sizes[0].id,
          bagItemId: mockBagItemId,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity,
        price: priceWithDiscount - discount,
        priceWithoutDiscount: priceWithoutDiscount,
        quantity,
        sku,
        size: sizes[0].name,
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
          result: { id: mockBagId },
          entities: {
            bagItems: {
              [mockBagItemId]: {
                id: mockBagItemId,
                product: mockBagProductId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId: mockBagItemId,
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 3,
          quantity: 1,
          size: sizes[0].id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 3,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 2,
        sku,
        size: sizes[0].name,
        variant: colorName,
      });
    });

    it('Should call `analytics.track(eventTypes.PRODUCT_ADDED_TO_CART)` with the correct payload if new quantity is higher than old quantity', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
          entities: {
            bagItems: {
              [mockBagItemId]: {
                id: mockBagItemId,
                product: mockBagProductId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId: mockBagItemId,
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 3,
          quantity: 6,
          size: sizes[0].id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 3,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 3,
        sku,
        size: sizes[0].name,
        variant: colorName,
      });
    });

    it('Should track a remove and an add event if the product sizes changed', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
          entities: {
            bagItems: {
              [mockBagItemId]: {
                id: mockBagItemId,
                product: mockBagProductId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId: mockBagItemId,
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 1,
          quantity: 3,
          size: sizes[0].id,
          oldSize: sizes[1],
        },
      });

      const baseData = {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 1,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: 3,
        sku,
        size: sizes[0].name,
        variant: colorName,
        oldSize: sizes[1].name,
      };

      expect(trackSpy).nthCalledWith(1, eventTypes.PRODUCT_UPDATED, baseData);

      expect(trackSpy).nthCalledWith(2, eventTypes.PRODUCT_REMOVED_FROM_CART, {
        ...baseData,
        quantity: 1,
        size: sizes[1].name,
      });

      expect(trackSpy).nthCalledWith(3, eventTypes.PRODUCT_ADDED_TO_CART, {
        ...baseData,
        oldQuantity: 0,
      });
    });
  });

  describe('Custom action types', () => {
    const myActionTypeAddToBag = 'myActionType.AddToBag';
    const myActionTypeUpdateBag = 'myActionType.UpdateBag';
    const myActionTypeRemoveFromBag = 'myActionType.RemoveFromBag';

    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        bagMiddleware(analytics, {
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
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity,
          quantity,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update bag action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateBag,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity,
          quantity,
          size: sizes[0].id,
        },
      });

      const expectedData = {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: 0,
        id: mockBagProductId,
        name: productDescription,
        price: productData.price.includingTaxes,
        priceWithoutDiscount: productData.price.includingTaxesWithoutDiscount,
        oldQuantity,
        quantity,
        size: sizes[0].name,
        sku,
        variant: colorName,
      };

      // expect trigger analytics product updated event
      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_UPDATED, expectedData);

      // expect trigger analytics product removed event
      expect(trackSpy).toBeCalledWith(
        eventTypes.PRODUCT_REMOVED_FROM_CART,
        expectedData,
      );
    });

    it('should handle a custom action type for remove from bag action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromBag,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity,
          quantity,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });
  });
});
