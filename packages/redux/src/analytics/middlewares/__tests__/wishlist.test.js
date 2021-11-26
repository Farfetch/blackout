import { actionTypes } from '../../../wishlists';
import { getBrand, getCategory, getProduct } from '../../../entities';
import {
  initialReduxState,
  mockBrandId,
  mockCategoryId,
  mockStore,
  mockWishlistProductId,
} from 'redux/tests';
import { logger } from '@farfetch/blackout-analytics/utils';
import { wishlistMiddleware } from '../../';
import Analytics, {
  eventTypes,
  fromParameterTypes,
} from '@farfetch/blackout-analytics';
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
const productData = getProduct(initialReduxState, mockWishlistProductId);
const {
  name,
  shortDescription,
  price: { includingTaxes: price },
} = productData;
const value = price;
const affiliation = 'acme';
const coupon = 'super coupon';
const discount = 0;
const from = fromParameterTypes.PDP;
const position = 3;
const productDescription = shortDescription || name;
// Color name must be the one that has a tag of 'DesignerColor'
const colorName = productData.colors.find(color =>
  color.tags.includes('DesignerColor'),
).color.name;
const brandName = getBrand(initialReduxState, mockBrandId).name;
const categoryName = getCategory(initialReduxState, mockCategoryId).name;
const currencyCode = 'USD';
const getMockState = data => merge({}, initialReduxState, data);

describe('wishlistMiddleware()', () => {
  let store;

  beforeEach(() => {
    store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);

    jest.clearAllMocks();

    analytics.useContext(() => ({
      currencyCode,
    }));
  });

  describe('When the store has incomplete data', () => {
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
        [wishlistMiddleware(analytics)],
      );
    });

    it('Should log an error if not passed the analytics instance', () => {
      // test undefined value
      wishlistMiddleware(undefined);

      expect(loggerErrorSpy).toBeCalled();

      loggerErrorSpy.mockClear();

      // test instanceof
      wishlistMiddleware({});

      expect(loggerErrorSpy).toBeCalled();
    });

    it('Should not throw when a product does not exists on entities reducer', () => {
      expect(() =>
        store.dispatch({
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
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
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
          payload: {},
          meta: {},
        }),
      ).not.toThrow();
    });

    it('Should not throw when product color tags are not defined in state', () => {
      expect(() =>
        store.dispatch({
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
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
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(loggerErrorSpy).toBeCalled();
    });
  });

  describe('Add item to wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });
    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          affiliation,
          coupon,
          from,
          position,
          productId: mockWishlistProductId,
          value,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
        affiliation,
        brand: brandName,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discount,
        from,
        id: mockWishlistProductId,
        name: productDescription,
        position,
        price,
        variant: colorName,
        value,
      });
    });
  });

  describe('Remove item from wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });
    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(trackSpy).toBeCalledWith(
        eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
        {
          brand: brandName,
          category: categoryName,
          currency: currencyCode,
          discount,
          id: mockWishlistProductId,
          name: productDescription,
          price,
          variant: colorName,
        },
      );
    });
  });

  describe('Update item in wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });
    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_UPDATED_WISHLIST, {
        brand: brandName,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: mockWishlistProductId,
        name: productDescription,
        price,
        variant: colorName,
      });
    });
  });

  describe('Custom action types', () => {
    const myActionTypeAddToWishlist = 'myActionType.AddToWishlist';
    const myActionTypeUpdateWishlist = 'myActionType.UpdateWishlist';
    const myActionTypeRemoveFromWishlist = 'myActionType.RemoveFromWishlist';

    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        wishlistMiddleware(analytics, {
          ADD_WISHLIST_ITEM_SUCCESS: myActionTypeAddToWishlist,
          UPDATE_WISHLIST_ITEM_SUCCESS: myActionTypeUpdateWishlist,
          REMOVE_WISHLIST_ITEM_SUCCESS: myActionTypeRemoveFromWishlist,
        }),
      ]);
    });
    it('should handle a custom action type for add to wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeAddToWishlist,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlist,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for remove from wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromWishlist,
        payload: {},
        meta: {
          productId: mockWishlistProductId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should not track an event if any other action is called', async () => {
      await store.dispatch({
        type: 'my.custom.action',
        payload: {
          bar: 'biz',
        },
        meta: {
          foo: 'bar',
        },
      });

      expect(trackSpy).not.toBeCalled();
    });
  });
});
