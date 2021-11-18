import { actionTypes } from '../../../../wishlists/redux';
import { logger } from '../../../utils';
import { mockStore } from '../../../../../tests';
import { wishlistMiddleware } from '../../';
import Analytics, { eventTypes } from '../../../';

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
const brandId = 123123;
const brandName = 'Jimmy Choo';
const productId = 13976753;
const categoryId = 135971;
const affiliation = 'acme';
const coupon = 'super coupon';
const from = 'somewhere';
const position = 3;

const sizes = [
  { id: 12, name: 'S' },
  { id: 123, name: 'L' },
];
const productDescription = 'Woven Marianne Shopper Bag';
const categoryName = 'Bags';
const currencyCode = 'USD';
const discount = 0;
const price = 0.0499;
const value = price;
const colorName = 'BLUE';
const wishlistId = '00000-00000-0000-0000-0';
const wishlistItemId = 29019222939;
const getMockState = data => ({
  entities: {
    wishlist: {
      [wishlistId]: {
        id: wishlistId,
      },
    },
    wishlistItems: {
      [wishlistItemId]: {
        id: wishlistItemId,
        product: productId,
      },
    },
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
        name: productDescription,
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
        sizes,
      },
    },
  },
  ...data,
});

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
          type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
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
          type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
          payload: {},
          meta: {},
        }),
      ).not.toThrow();
    });

    it('Should not throw when product color tags are not defined', () => {
      expect(() =>
        store.dispatch({
          type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
          payload: {},
          meta: {
            productId: productId,
          },
        }),
      ).not.toThrow();
    });

    it('Should log an error if the currencyCode is not set in analytics context', () => {
      analytics.setContext({
        currencyCode: null,
      });

      store.dispatch({
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        payload: {},
        meta: {
          productId: productId,
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
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        payload: {
          entities: {
            wishlistItems: {
              [wishlistItemId]: {
                id: wishlistItemId,
                product: productId,
                price: {
                  includingTaxes: price,
                },
              },
            },
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          position,
          productId,
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
        id: productId,
        name: productDescription,
        position,
        price,
        value,
        variant: colorName,
      });
    });
  });

  describe('Remove item from wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });
    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId,
        },
      });

      expect(trackSpy).toBeCalledWith(
        eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
        {
          brand: brandName,
          category: categoryName,
          currency: currencyCode,
          discount,
          id: productId,
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
          productId,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_UPDATED_WISHLIST, {
        brand: brandName,
        category: categoryName,
        currency: currencyCode,
        discount,
        id: productId,
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
          ADD_ITEM_TO_WISHLIST_SUCCESS: myActionTypeAddToWishlist,
          UPDATE_WISHLIST_ITEM_SUCCESS: myActionTypeUpdateWishlist,
          DELETE_WISHLIST_ITEM_SUCCESS: myActionTypeRemoveFromWishlist,
        }),
      ]);
    });
    it('should handle a custom action type for add to wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeAddToWishlist,
        payload: {},
        meta: {
          productId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlist,
        payload: {},
        meta: {
          productId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for remove from wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromWishlist,
        payload: {},
        meta: {
          productId,
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
