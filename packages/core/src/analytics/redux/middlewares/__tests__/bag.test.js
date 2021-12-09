import { actionTypes as bagActionTypes } from '../../../../bags/redux';
import { bagMiddleware } from '../../';
import { logger } from '../../../utils';
import { mockStore } from '../../../../../tests';
import Analytics, { eventTypes } from '../../../';
import merge from 'lodash/merge';

// Mock logger so it does not output to the console
jest.mock('../../../../helpers', () => ({
  ...jest.requireActual('../../../../helpers'),
  Logger: class {
    warn(message) {
      return message;
    }
    error(message) {
      return message;
    }
  },
}));

const analytics = new Analytics();
const trackSpy = jest.spyOn(analytics, 'track');
const loggerErrorSpy = jest.spyOn(logger, 'error');
const affiliation = 'random';
const bagId = '24852d0e-bb55-4011-9acd-79f7c91c17eb';
const bagItemId = 365423069;
const brandId = 123123;
const brandName = 'Jimmy Choo';
const categoryId = 135971;
const categoryName = 'Bags';
const colorName = 'BLUE';
const coupon = 'super discount';
const currencyCode = 'USD';
const discount = 5;
const from = 'bag';
const oldQuantity = 2;
const position = 3;
const priceWithoutDiscount = 15;
const priceWithDiscount = priceWithoutDiscount - discount;
const value = priceWithDiscount;
const productDescription = 'Woven Marianne Shopper Bag';
const productId = 13976753;
const quantity = 1;
const sizes = [
  { id: 12, name: 'S' },
  { id: 123, name: 'L' },
];
const bagItemQuantity = 5;
const totalPromotionDiscountValue = 2;
const discountIncludingPromotions =
  discount + totalPromotionDiscountValue / bagItemQuantity;
const sku = '000000000006175920';

const baseMockState = {
  entities: {
    brands: {
      [brandId]: {
        id: brandId,
        name: brandName,
      },
    },
    categories: {
      [categoryId]: {
        name: categoryName,
      },
    },
    products: {
      [productId]: {
        price: {
          includingTaxes: priceWithDiscount,
          includingTaxesWithoutDiscount: priceWithoutDiscount,
        },
        brand: brandId,
        categories: [categoryId],
        colors: [
          {
            color: {
              name: colorName,
            },
            tags: ['DesignerColor'],
          },
        ],
        id: productId,
        shortDescription: productDescription,
        sku,
        sizes,
      },
    },
    bag: {
      [bagId]: {
        id: bagId,
        items: [bagItemId],
      },
    },
    bagItems: {
      [bagItemId]: {
        price: {
          includingTaxes: priceWithDiscount,
          includingTaxesWithoutDiscount: priceWithoutDiscount,
        },
        product: productId,
        size: sizes[0],
        quantity: bagItemQuantity,
        promotionDetail: {
          totalDiscountValue: totalPromotionDiscountValue,
        },
      },
    },
  },
  bag: {
    id: bagId,
  },
};

const getMockState = data => merge({}, baseMockState, data);

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
          type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
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
          type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
          payload: {},
          meta: {},
        }),
      ).not.toThrow();
    });

    it('Should not throw when product color tags are not defined', () => {
      expect(() =>
        store.dispatch({
          type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
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
        type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
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
        type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
        payload: {
          result: bagId,
          entities: {
            bagItems: {
              [bagItemId]: {
                id: bagItemId,
                product: productId,
                size: { id: sizes[0].id },
              },
            },
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          oldQuantity,
          position,
          productId,
          quantity,
          size: sizes[0].id,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        affiliation,
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        from,
        id: productId,
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
    beforeEach(() => {
      const mockState = getMockState();

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.DELETE_BAG_ITEM_SUCCESS,
        payload: {
          result: bagId,
        },
        meta: {
          productId,
          oldQuantity,
          quantity,
          size: sizes[0].id,
          bagItemId,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: productId,
        name: productDescription,
        oldQuantity,
        price: priceWithDiscount,
        priceWithoutDiscount,
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
          result: bagId,
          entities: {
            bagItems: {
              [bagItemId]: {
                id: bagItemId,
                product: productId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId,
        },
        meta: {
          productId,
          oldQuantity: 3,
          quantity: 1,
          size: sizes[0].id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: productId,
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
          result: bagId,
          entities: {
            bagItems: {
              [bagItemId]: {
                id: bagItemId,
                product: productId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId,
        },
        meta: {
          productId,
          oldQuantity: 3,
          quantity: 6,
          size: sizes[0].id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: productId,
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
          result: bagId,
          entities: {
            bagItems: {
              [bagItemId]: {
                id: bagItemId,
                product: productId,
                size: { id: sizes[0].id },
              },
            },
          },
          bagItemId,
        },
        meta: {
          productId,
          oldQuantity: 1,
          quantity: 3,
          size: sizes[0].id,
          oldSize: sizes[1],
        },
      });

      const baseData = {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: discountIncludingPromotions,
        id: productId,
        name: productDescription,
        price: priceWithDiscount,
        priceWithoutDiscount,
        sku,
        oldSize: sizes[1].name,
        variant: colorName,
        oldQuantity: 1,
        quantity: 3,
        size: sizes[0].name,
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
          ADD_ITEM_TO_BAG_SUCCESS: myActionTypeAddToBag,
          UPDATE_BAG_ITEM_SUCCESS: myActionTypeUpdateBag,
          DELETE_BAG_ITEM_SUCCESS: myActionTypeRemoveFromBag,
        }),
      ]);
    });
    it('should handle a custom action type for add to bag action', async () => {
      await store.dispatch({
        type: myActionTypeAddToBag,
        payload: {
          result: bagId,
        },
        meta: {
          productId,
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
          result: bagId,
        },
        meta: {
          productId,
          oldQuantity,
          quantity,
          size: sizes[0].id,
        },
      });

      const expectedData = {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discountValue: 0,
        id: productId,
        name: productDescription,
        price: priceWithDiscount,
        priceWithoutDiscount: 10,
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
          result: bagId,
        },
        meta: {
          productId,
          oldQuantity,
          quantity,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });
  });
});
