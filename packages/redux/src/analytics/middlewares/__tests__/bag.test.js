import { actionTypes as bagActionTypes, getBagItem } from '../../../bags';
import { bagMiddleware } from '../../';
import {
  getBrand,
  getCategory,
  getProduct,
} from '@farfetch/blackout-client/entities/redux/selectors';
import {
  initialReduxState,
  mockBagId,
  mockBagItemId,
  mockBagProductId,
  mockBrandId,
  mockCategoryId,
  mockStore,
} from 'redux/tests';
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
const {
  name,
  price: { includingTaxes: price },
  shortDescription,
  sizes,
  sku,
} = productData;

const affiliation = 'random';
const brandName = getBrand(initialReduxState, mockBrandId).name;
const categoryName = getCategory(initialReduxState, mockCategoryId).name;
const colorName = productData.colors.find(color =>
  color.tags.includes('DesignerColor'),
).color.name;
const coupon = 'super discount';
const currencyCode = 'USD';
const discount = 0;
const from = 'bag';
const oldQuantity = 2;
const position = 3;
const priceInBagItem = getBagItem(initialReduxState, mockBagItemId).price
  .includingTaxes; // Just to differentiate in tests that are supposed to get the price from the bagItem entity
const value = priceInBagItem;
const productDescription = shortDescription || name; // Color name must be the one that has a tag of 'DesignerColor'
const quantity = 1;
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
      // For add to bag events, bagItems state
      // should not be available in order to force to use
      // the product properties to obtain the payload to the analytics track call
      const mockState = getMockState();
      delete mockState.bag.items.ids;
      delete mockState.entities.bagItems;

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          affiliation,
          coupon,
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
        discount,
        from,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity,
        position,
        price,
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
      // For remove from bag events, sizes and price might not
      // be available if a hard-refresh is done when browsing
      // the bag page
      const mockState = getMockState();
      delete mockState.entities.products[mockBagProductId].sizes;
      delete mockState.entities.products[mockBagProductId].price;

      store = mockStore(null, mockState, [bagMiddleware(analytics)]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: bagActionTypes.REMOVE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity,
          quantity,
          value,
          size: sizes[0].id,
          bagItemId: mockBagItemId,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity,
        price: priceInBagItem,
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
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 3,
          quantity: 1,
          size: sizes[0].id,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 3,
        price,
        quantity: 2,
        sku,
        size: sizes[0].name,
        value,
        variant: colorName,
      });
    });

    it('Should call `analytics.track(eventTypes.PRODUCT_ADDED_TO_CART)` with the correct payload if new quantity is higher than old quantity', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 3,
          quantity: 6,
          size: sizes[0].id,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 3,
        price,
        quantity: 3,
        sku,
        size: sizes[0].name,
        value,
        variant: colorName,
      });
    });

    it('Should track a remove and an add event if the product sizes changed', async () => {
      await store.dispatch({
        type: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
        payload: {
          result: { id: mockBagId },
        },
        meta: {
          productId: mockBagProductId,
          oldQuantity: 1,
          quantity: 3,
          size: sizes[0].id,
          oldSize: sizes[1],
          value,
        },
      });

      expect(trackSpy).nthCalledWith(1, eventTypes.PRODUCT_REMOVED_FROM_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 1,
        price,
        quantity: 1,
        sku,
        size: sizes[1].name,
        oldSize: sizes[1].name,
        value,
        variant: colorName,
      });

      expect(trackSpy).nthCalledWith(2, eventTypes.PRODUCT_ADDED_TO_CART, {
        brand: brandName,
        cartId: mockBagId,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockBagProductId,
        name: productDescription,
        oldQuantity: 0,
        price,
        quantity: 3,
        sku,
        size: sizes[0].name,
        value,
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
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
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
