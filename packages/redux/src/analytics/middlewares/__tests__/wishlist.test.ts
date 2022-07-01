import * as actionTypes from '../../../wishlists/actionTypes';
import { analyticsWishlistMiddleware } from '../../middlewares/wishlist';
import { getBrand, getCategory, getProduct } from '../../../entities';
import { getWishlistItem } from '../../../wishlists';
import { mockStore, mockWishlistSetId } from '../../../../tests';
import { wishlistMockData } from 'tests/__fixtures__/analytics/wishlist';
import Analytics, {
  eventTypes,
  fromParameterTypes,
  utils,
} from '@farfetch/blackout-analytics';
import merge from 'lodash/merge';
import type { PriceAdapted } from '../../../helpers/adapters';
import type {
  ProductEntity,
  WishlistItemHydrated,
} from '../../../entities/types';
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
const productData = getProduct(
  wishlistMockData.state,
  wishlistMockData.productId,
) as ProductEntity;
const { name, shortDescription } = productData;
const wishlistItem = getWishlistItem(
  wishlistMockData.state,
  wishlistMockData.wishListItemId,
) as WishlistItemHydrated;

const { price, quantity, size } = wishlistItem;

const {
  includingTaxes: priceWithDiscount,
  includingTaxesWithoutDiscount: priceWithoutDiscount,
} = price as NonNullable<PriceAdapted>;

const discount = priceWithoutDiscount - priceWithDiscount;
const value = priceWithDiscount;
const affiliation = 'farfetch';
const coupon = 'super coupon';
const from = fromParameterTypes.RECOMMENDATIONS;
const position = 3;
const productDescription = shortDescription || name;
// Color name must be the one that has a tag of 'DesignerColor'
const colorName = productData?.colors?.find(color =>
  color.tags.includes('DesignerColor'),
)?.color.name;
const brandName = getBrand(
  wishlistMockData.state,
  wishlistMockData.brandId,
)?.name;
const categoryName = getCategory(
  wishlistMockData.state,
  wishlistMockData.categoryId,
)?.name;
const currencyCode = 'USD';
const listId = 'related_products';
const list = 'Related products';
const wishlistName = 'my_wishlist';
const getMockState = (data: Record<string, unknown> = {}): StoreState =>
  merge({}, wishlistMockData.state, data);

describe('analyticsWishlistMiddleware', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(null, getMockState(), [
      analyticsWishlistMiddleware(analytics),
    ]);

    jest.clearAllMocks();

    analytics.useContext(() => ({
      currencyCode,
    }));
  });

  it('Should log an error if not passed the analytics instance', () => {
    // @ts-expect-error test undefined value
    analyticsWishlistMiddleware(undefined);

    expect(loggerErrorSpy).toBeCalled();

    loggerErrorSpy.mockClear();

    // @ts-expect-error test instanceof
    analyticsWishlistMiddleware({});

    expect(loggerErrorSpy).toBeCalled();
  });

  describe('When the store has incomplete data', () => {
    beforeEach(() => {
      store = mockStore(
        null,
        getMockState({
          entities: {
            products: {
              [wishlistMockData.productId]: {
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
        [analyticsWishlistMiddleware(analytics)],
      );
    });

    it('Should not throw when a product does not exist on entities reducer', () => {
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

    it('Should not throw when product color tags are not defined', () => {
      expect(() =>
        store.dispatch({
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
          payload: {},
          meta: {
            productId: wishlistMockData.productId,
          },
        }),
      ).not.toThrow();
    });

    it('Should log an error if the currencyCode is not set in analytics context', async () => {
      // @ts-expect-error
      analytics.useContext(() => ({ currencyCode: null }));

      await store.dispatch({
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
        payload: {},
        meta: {
          productId: 123,
        },
      });

      expect(loggerErrorSpy).toBeCalled();
    });
  });

  describe('Add item to wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      // To facilitate testing, we simulate adding the same wishlist item
      // that is already on the redux store mock state. This is because the
      // reducers are not run when testing, so the state will always be the same
      // as the one defined on the mockStore call, regardless of the action payload
      // that is dispatched.
      await store.dispatch({
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
        payload: {
          entities: {
            wishlistItems: wishlistMockData.state?.entities?.wishlistItems,
          },
        },
        meta: {
          affiliation,
          coupon,
          from,
          list,
          listId,
          merchantId:
            wishlistMockData.state?.entities?.wishlistItems?.[
              wishlistMockData.wishListItemId
            ]?.merchant,
          position,
          productId: wishlistMockData.productId,
          size: wishlistMockData.state?.entities?.wishlistItems?.[
            wishlistMockData.wishListItemId
          ]?.size.id,
          scale:
            wishlistMockData.state?.entities?.wishlistItems?.[
              wishlistMockData.wishListItemId
            ]?.size.scale,
          value,
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
        id: wishlistMockData.productId,
        list,
        listId,
        name: productDescription?.trim(),
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity,
        size: size.name,
        value,
        variant: colorName,
        wishlistId: wishlistMockData.wishlistId,
      });
    });
  });

  describe('Remove item from wishlist', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);
    });

    it('Should intercept the action and call `analytics.track` with the correct payload', async () => {
      await store.dispatch({
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
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
          productId: wishlistMockData.productId,
          wishlistItemId: wishlistMockData.wishListItemId,
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
          id: wishlistMockData.productId,
          list,
          listId,
          name: productDescription?.trim(),
          position,
          price: priceWithDiscount,
          priceWithoutDiscount,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId: wishlistMockData.wishlistId,
        },
      );
    });
  });

  describe('Remove item from wishlist set', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);
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
            wishlistSetId: mockWishlistSetId,
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
            id: wishlistMockData.productId,
            list,
            listId,
            name: productDescription?.trim(),
            position,
            price: priceWithDiscount,
            priceWithoutDiscount,
            quantity,
            size: size.name,
            value,
            variant: colorName,
            wishlistId: mockWishlistSetId,
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
            wishlistSetId: mockWishlistSetId,
            wishlistItemId: wishlistMockData.wishListItemId,
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
            id: wishlistMockData.productId,
            list,
            listId,
            name: productDescription?.trim(),
            position,
            price: priceWithDiscount,
            priceWithoutDiscount,
            quantity,
            size: size.name,
            value,
            variant: colorName,
            wishlistId: mockWishlistSetId,
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
            wishlistSetId: mockWishlistSetId,
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
            wishlistSetId: mockWishlistSetId,
          },
        });

        expect(trackSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Add item to wishlist set', () => {
    beforeEach(() => {
      store = mockStore(null, getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);
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
                value: { wishlistItemId: wishlistMockData.wishListItemId },
                path: '/wishlistSetItems/-',
                op: 'add',
              },
            ],
            from,
            list,
            listId,
            position,
            wishlistSetId: mockWishlistSetId,
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
          id: wishlistMockData.productId,
          list,
          listId,
          name: productDescription?.trim(),
          price: priceWithDiscount,
          priceWithoutDiscount,
          position,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId: mockWishlistSetId,
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
            wishlistSetId: mockWishlistSetId,
            wishlistItemId: wishlistMockData.wishListItemId,
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
          id: wishlistMockData.productId,
          list,
          listId,
          name: productDescription?.trim(),
          price: priceWithDiscount,
          priceWithoutDiscount,
          position,
          quantity,
          size: size.name,
          value,
          variant: colorName,
          wishlistId: mockWishlistSetId,
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
            wishlistSetId: mockWishlistSetId,
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
          wishlistSetId: mockWishlistSetId,
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
        product: wishlistMockData.productId,
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
        [analyticsWishlistMiddleware(analytics)],
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
          listId: wishlistMockData.wishlistId,
          position,
          productId: wishlistMockData.productId,
          wishlistItemId: wishlistMockData.wishListItemId,
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
        id: wishlistMockData.productId,
        list: wishlistName,
        listId: wishlistMockData.wishlistId,
        name: productDescription?.trim(),
        position,
        price: priceWithDiscount,
        priceWithoutDiscount,
        quantity: newQuantity,
        size: newSize,
        value,
        variant: colorName,
        wishlistId: wishlistMockData.wishlistId,
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
        analyticsWishlistMiddleware(analytics, {
          ADD_WISHLIST_ITEM_SUCCESS: myActionTypeAddToWishlist,
          UPDATE_WISHLIST_ITEM_SUCCESS: myActionTypeUpdateWishlist,
          REMOVE_WISHLIST_ITEM_SUCCESS: myActionTypeRemoveFromWishlist,
          UPDATE_WISHLIST_SET_SUCCESS: myActionTypeUpdateWishlistSet,
        }),
      ]);
    });

    it('should handle a custom action type for add to wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeAddToWishlist,
        payload: {},
        meta: {
          productId: wishlistMockData.productId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlist,
        payload: {},
        meta: {
          productId: wishlistMockData.productId,
        },
      });

      expect(trackSpy).toBeCalledTimes(2);
    });

    it('should handle a custom action type for remove from wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromWishlist,
        payload: {},
        meta: {
          productId: wishlistMockData.productId,
        },
      });

      expect(trackSpy).toBeCalledTimes(1);
    });

    it('should handle a custom action type for update wishlist set action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlistSet,
        payload: {},
        meta: {
          wishlistItemId: wishlistMockData.wishListItemId,
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
