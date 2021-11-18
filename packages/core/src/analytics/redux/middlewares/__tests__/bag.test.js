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
const discount = 0;
const from = 'bag';
const oldQuantity = 2;
const position = 3;
const price = 0.0499;
const value = price;
const priceInBagItem = 0.05; // Just to differentiate in tests that are supposed to get the price from the bagItem entity
const productDescription = 'Woven Marianne Shopper Bag';
const productId = 13976753;
const quantity = 1;
const sizes = [
  { id: 12, name: 'S' },
  { id: 123, name: 'L' },
];
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
          includingTaxes: price,
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
          includingTaxes: priceInBagItem,
        },
        size: sizes[1],
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
              123: {
                colors: [
                  {
                    color: {
                      name: colorName,
                    },
                    tags: undefined,
                  },
                ],
              },
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
      // For add to bag events, bagItems state
      // should not be available in order to force to use
      // the product properties to obtain the payload to the analytics track call
      const mockState = getMockState();
      delete mockState.entities.bag[bagId].items;
      delete mockState.entities.bagItems;

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
        payload: {
          result: bagId,
        },
        meta: {
          affiliation,
          coupon,
          discount,
          from,
          oldQuantity,
          position,
          productId,
          quantity,
          value,
          size: sizes[0].id,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        affiliation,
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discount,
        from,
        id: productId,
        position,
        name: productDescription,
        oldQuantity,
        price,
        quantity,
        value,
        size: sizes[0].name,
        sku,
        variant: colorName,
      });
    });
  });

  describe('Remove item from bag', () => {
    beforeEach(() => {
      // For remove from bag events, sizes and price might not
      // be available if a hard-refresh is done when browsing
      // the bag page
      const mockState = getMockState();
      delete mockState.entities.products[productId].sizes;
      delete mockState.entities.products[productId].price;

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
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discount: 0,
        id: productId,
        name: productDescription,
        oldQuantity,
        price: priceInBagItem,
        quantity,
        sku,
        size: sizes[1].name,
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
        discount,
        id: productId,
        name: productDescription,
        oldQuantity: 3,
        price,
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
        discount: 0,
        id: productId,
        name: productDescription,
        oldQuantity: 3,
        price,
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
        },
        meta: {
          productId,
          oldQuantity: 1,
          quantity: 3,
          size: sizes[0].id,
          oldSize: sizes[1],
        },
      });

      expect(trackSpy).nthCalledWith(1, eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discount: 0,
        id: productId,
        name: productDescription,
        oldQuantity: 1,
        price,
        quantity: 1,
        sku,
        size: sizes[1].name,
        oldSize: sizes[1].name,
        variant: colorName,
      });

      expect(trackSpy).nthCalledWith(2, eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: bagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: productId,
        name: productDescription,
        oldQuantity: 0,
        price,
        quantity: 3,
        sku,
        size: sizes[0].name,
        variant: colorName,
        oldSize: sizes[1].name,
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
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
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
