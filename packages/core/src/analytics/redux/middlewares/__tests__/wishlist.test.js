import { actionTypes } from '../../../../wishlists/redux';
import { logger } from '../../../utils';
import { mockStore } from '../../../../../tests';
import { wishlistMiddleware } from '../../';
import Analytics, { eventTypes, fromParameterTypes } from '../../../';

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
const affiliation = 'farfetch';
const coupon = 'super coupon';
const from = fromParameterTypes.RECOMMENDATIONS;
const position = 3;
const productDescription = 'Christy ballerinas';
const categoryName = 'Shoes';
const currencyCode = 'USD';
const discount = 1;
const priceWithoutDiscount = 10;
const priceWithDiscount = priceWithoutDiscount - discount;
const value = priceWithDiscount;
const quantity = 1;
const size = { id: '10', scale: '26', name: '37' };
const colorName = 'BLUE';
const merchantId = 15000;
const wishlistId = '00000-00000-0000-0000-0';
const wishlistName = 'my_wishlist';
const wishlistItemId = 29019222939;
const wishlistSetId = 'cde0389b-c362-4d46-ae4f-a467df08ec4b';
const wishlistSetName = 'test_wishlist_set';
const listId = 'related_products';
const list = 'Related products';

/**
 * Gets the store state to be used by tests.
 *
 * @param {object} data - Additional state data to merge to the default state.
 *
 * @returns {object} The store state merged with the data argument.
 */
const getMockState = data => ({
  entities: {
    wishlist: {
      [wishlistId]: {
        id: wishlistId,
      },
    },
    wishlistSets: {
      [wishlistSetId]: {
        name: wishlistSetName,
        wishlistSetItems: [{ wishlistItemId }],
      },
    },
    wishlistItems: {
      [wishlistItemId]: {
        id: wishlistItemId,
        product: productId,
        price: {
          includingTaxes: priceWithDiscount,
          includingTaxesWithoutDiscount: priceWithoutDiscount,
        },
        quantity,
        size,
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
      },
    },
  },
  wishlist: {
    id: wishlistId,
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

  it('Should log an error if not passed the analytics instance', () => {
    // test undefined value
    wishlistMiddleware(undefined);

    expect(loggerErrorSpy).toBeCalled();

    loggerErrorSpy.mockClear();

    // test instanceof
    wishlistMiddleware({});

    expect(loggerErrorSpy).toBeCalled();
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

    it('Should not throw when a product does not exist on entities reducer', () => {
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
      // To facilitate testing, we simulate adding the same wishlist item
      // that is already on the redux store mock state. This is because the
      // reducers are not run when testing, so the state will always be the same
      // as the one defined on the mockStore call, regardless of the action payload
      // that is dispatched.
      await store.dispatch({
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        payload: {
          entities: {
            wishlistItems: {
              [wishlistItemId]: {
                id: wishlistItemId,
                product: productId,
                price: {
                  includingTaxes: priceWithDiscount,
                  includingTaxesWithoutDiscount: priceWithoutDiscount,
                },
                quantity,
                size,
                merchant: merchantId,
              },
            },
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          list,
          listId,
          merchantId,
          position,
          productId,
          size: size.id,
          scale: size.scale,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
        affiliation,
        brand: brandName,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discount,
        from,
        id: productId,
        list,
        listId,
        name: productDescription.trim(),
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity,
        size: size.name,
        value,
        variant: colorName,
        wishlistId,
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
        payload: {
          entities: {
            wishlistItems: {},
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          list,
          listId,
          position,
          productId,
          wishlistItemId,
        },
      });

      expect(trackSpy).toBeCalledWith(
        eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
        {
          affiliation,
          brand: brandName,
          category: categoryName,
          coupon,
          currency: currencyCode,
          discountValue: discount,
          from,
          id: productId,
          list,
          listId,
          name: productDescription.trim(),
          position,
          price: priceWithDiscount,
          priceWithoutDiscount,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId,
        },
      );
    });
  });

  describe('Remove item from wishlist set', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });

    describe('When the `UPDATE_WISHLIST_SET_SUCCESS` action does _NOT_ indicate explicitly it is a remove operation', () => {
      it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                path: '/wishlistSetItems/0',
                op: 'remove',
              },
            ],
            from,
            list,
            listId,
            position,
            wishlistSetId,
          },
        });

        expect(trackSpy).toBeCalledWith(
          eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
          {
            affiliation,
            brand: brandName,
            category: categoryName,
            coupon,
            currency: currencyCode,
            discountValue: discount,
            from,
            id: productId,
            list,
            listId,
            name: productDescription.trim(),
            position,
            price: priceWithDiscount,
            priceWithoutDiscount,
            quantity,
            size: size.name,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
          },
        );
      });
    });

    describe('When the `UPDATE_WISHLIST_SET_SUCCESS` action does indicate explicitly it is a remove operation', () => {
      it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            from,
            isDeleteOperation: true,
            list,
            listId,
            position,
            wishlistSetId,
            wishlistItemId,
          },
        });

        expect(trackSpy).toBeCalledWith(
          eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
          {
            affiliation,
            brand: brandName,
            category: categoryName,
            coupon,
            currency: currencyCode,
            discountValue: discount,
            from,
            id: productId,
            list,
            listId,
            name: productDescription.trim(),
            position,
            price: priceWithDiscount,
            priceWithoutDiscount,
            quantity,
            size: size.name,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
          },
        );
      });
    });

    describe('Error cases', () => {
      it('Should not track an event when the `UPDATE_WISHLIST_SET_SUCCESS` action provides an incorrect wishlist item index', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                path: '/wishlistSetItems/invalid_index',
                op: 'remove',
              },
            ],
            from,
            wishlistSetId,
          },
        });

        expect(trackSpy).not.toHaveBeenCalled();
      });

      it('Should not track an event when the `UPDATE_WISHLIST_SET_SUCCESS` action provides a wishlist set id that is not in the store', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                path: '/wishlistSetItems/0',
                op: 'remove',
              },
            ],
            from,
            wishlistSetId: 'dummy-set-id',
          },
        });

        expect(trackSpy).not.toHaveBeenCalled();
      });

      it('Should not track an event when the `UPDATE_WISHLIST_SET_SUCCESS` action provides a wishlist list index that is not available on the store', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                path: '/wishlistSetItems/10000000',
                op: 'remove',
              },
            ],
            from,
            wishlistSetId,
          },
        });

        expect(trackSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Add item to wishlist set', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [wishlistMiddleware(analytics)]);
    });

    describe('When the `UPDATE_WISHLIST_SET_SUCCESS` action does _NOT_ indicate explicitly it is an add operation', () => {
      it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                value: { wishlistItemId },
                path: '/wishlistSetItems/-',
                op: 'add',
              },
            ],
            from,
            list,
            listId,
            position,
            wishlistSetId,
          },
        });

        expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
          affiliation,
          brand: brandName,
          category: categoryName,
          coupon,
          currency: currencyCode,
          discountValue: discount,
          from,
          id: productId,
          list,
          listId,
          name: productDescription,
          price: priceWithDiscount,
          priceWithoutDiscount,
          position,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId: wishlistSetId,
        });
      });
    });

    describe('When the `UPDATE_WISHLIST_SET_SUCCESS` action does indicate explicitly it is an add operation', () => {
      it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            from,
            isAddOperation: true,
            list,
            listId,
            position,
            wishlistItemId,
            wishlistSetId,
          },
        });

        expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
          affiliation,
          brand: brandName,
          category: categoryName,
          coupon,
          currency: currencyCode,
          discountValue: discount,
          from,
          id: productId,
          list,
          listId,
          name: productDescription,
          price: priceWithDiscount,
          priceWithoutDiscount,
          position,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId: wishlistSetId,
        });
      });
    });

    describe('Error cases', () => {
      it('Should not track an event when the `UPDATE_WISHLIST_SET_SUCCESS` action specifies a wishlist item id that is not present on the store', async () => {
        await store.dispatch({
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: {
            affiliation,
            coupon,
            data: [
              {
                value: { wishlistItemId: 10000000000 },
                path: '/wishlistSetItems/-',
                op: 'add',
              },
            ],
            from,
            wishlistSetId,
          },
        });
      });

      expect(trackSpy).not.toHaveBeenCalled();
    });

    it('Should not track an event when the `UPDATE_WISHLIST_SET_SUCCESS` does not specify a wishlist item id', async () => {
      await store.dispatch({
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
        meta: {
          affiliation,
          coupon,
          data: [
            {
              path: '/wishlistSetItems/-',
              op: 'add',
            },
          ],
          from,
          wishlistSetId,
        },
      });
    });

    expect(trackSpy).not.toHaveBeenCalled();
  });

  describe('Update item in wishlist', () => {
    const newWishlistItemId = 614727928;
    const newQuantity = 14;
    const newSize = '40';

    const newWishlistItemEntity = {
      [newWishlistItemId]: {
        id: newWishlistItemId,
        price: {
          includingTaxes: priceWithDiscount,
          includingTaxesWithoutDiscount: priceWithoutDiscount,
        },
        size: { name: newSize },
        product: productId,
        quantity: newQuantity,
      },
    };

    beforeEach(() => {
      const mockState = getMockState();

      // To facilitate testing, set the store with the newly updated
      // wishlist item data because the reducers will not be run
      // when testing, so the dispatch of an action will not change
      // the data on the store (retrieved through the store.getState() method)
      store = mockStore(
        null,
        {
          ...mockState,
          entities: {
            ...mockState.entities,
            wishlistItems: newWishlistItemEntity,
          },
        },
        [wishlistMiddleware(analytics)],
      );
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        payload: {
          entities: {
            wishlistItems: newWishlistItemEntity,
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          list: wishlistName,
          listId: wishlistId,
          position,
          productId,
          wishlistItemId,
        },
      });

      expect(trackSpy).toBeCalledWith(eventTypes.PRODUCT_UPDATED_WISHLIST, {
        affiliation,
        brand: brandName,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discount,
        from,
        id: productId,
        list: wishlistName,
        listId: wishlistId,
        name: productDescription,
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: newQuantity,
        size: newSize,
        value,
        variant: colorName,
        wishlistId,
      });
    });
  });

  describe('Custom action types', () => {
    const myActionTypeAddToWishlist = 'myActionType.AddToWishlist';
    const myActionTypeUpdateWishlist = 'myActionType.UpdateWishlist';
    const myActionTypeRemoveFromWishlist = 'myActionType.RemoveFromWishlist';
    const myActionTypeUpdateWishlistSet = 'myActionType.UpdateWishlistSet';

    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        wishlistMiddleware(analytics, {
          ADD_ITEM_TO_WISHLIST_SUCCESS: myActionTypeAddToWishlist,
          UPDATE_WISHLIST_ITEM_SUCCESS: myActionTypeUpdateWishlist,
          DELETE_WISHLIST_ITEM_SUCCESS: myActionTypeRemoveFromWishlist,
          UPDATE_WISHLIST_SET_SUCCESS: myActionTypeUpdateWishlistSet,
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

      expect(trackSpy).toBeCalledTimes(2);
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

    it('should handle a custom action type for update wishlist set action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlistSet,
        payload: {},
        meta: {
          wishlistItemId,
          isDeleteOperation: true,
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
