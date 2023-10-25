import * as actionTypes from '../../../wishlists/actionTypes.js';
import { analyticsWishlistMiddleware } from '../../middlewares/wishlist.js';
import {
  type AnyAction,
  combineReducers,
  type Middleware,
  type MiddlewareAPI,
} from 'redux';
import { getBrand } from '../../../brands/index.js';
import { getCategory } from '../../../categories/index.js';
import { getProduct } from '../../../products/selectors/product.js';
import { getWishlistItem } from '../../../wishlists/index.js';
import { merge } from 'lodash-es';
import { mockStore } from '../../../../tests/index.js';
import { mockWishlistItem } from 'tests/__fixtures__/wishlists/index.mjs';
import {
  wishlistMockData,
  wishlistSetId,
} from 'tests/__fixtures__/analytics/wishlist/index.mjs';
import Analytics, {
  EventType,
  FromParameterType,
  utils,
} from '@farfetch/blackout-analytics';
import type {
  ProductEntity,
  WishlistItemDenormalized,
} from '../../../entities/types/index.js';
import type { StoreState } from '../../../types/index.js';

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
) as WishlistItemDenormalized;

const { price, quantity, size } = wishlistItem;

const {
  includingTaxes: priceWithDiscount,
  includingTaxesWithoutDiscount: priceWithoutDiscount,
} = price!;

const discount = priceWithoutDiscount - priceWithDiscount;
const value = priceWithDiscount;
const affiliation = 'farfetch';
const coupon = 'super coupon';
const from = FromParameterType.Recommendations;
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
const isMainWishlist = true;
const getMockState = (data: Record<string, unknown> = {}): StoreState =>
  merge({}, wishlistMockData.state, data);

// This is a simplified version of our createEntitiesReducer()
// This version was used instead, because createEntitiesReducer
// does not override completely user data, so makes testing
// a little more difficult. In runtime, that is not a problem.
const entitiesReducer = (state: StoreState = {}, action: AnyAction) => {
  if (action.payload && action.payload.entities) {
    return Object.assign({}, state, action.payload.entities);
  }

  return state;
};

const wishlistReducer = (state: StoreState = {}, action: AnyAction) => {
  if (action.payload && action.payload.wishlist) {
    return Object.assign({}, state, action.payload.wishlist);
  }

  return state;
};

const reducer = combineReducers({
  entities: entitiesReducer,
  wishlist: wishlistReducer,
});

// This is a very simplified redux store implementation.
// This was needed because our mockStore module that is based on
// redux-mock-store package does not execute the reducers
// which were needed for this test suite.
const mockSimplifiedStore = (
  initialState: StoreState = {},
  middlewares: Array<Middleware>,
) => {
  const store = {
    state: initialState,

    getState() {
      return this.state;
    },

    async dispatch(action: AnyAction) {
      const next = <T extends AnyAction>(action: T) => {
        this.state = reducer(this.state as Required<typeof this.state>, action);

        return action;
      };

      await Promise.all(
        middlewares.map(middleware =>
          middleware(this as MiddlewareAPI)(next)(action),
        ),
      );
    },
  };

  return store;
};

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

    expect(loggerErrorSpy).toHaveBeenCalled();

    loggerErrorSpy.mockClear();

    // @ts-expect-error test instanceof
    analyticsWishlistMiddleware({});

    expect(loggerErrorSpy).toHaveBeenCalled();
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

      expect(loggerErrorSpy).toHaveBeenCalled();
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
          isMainWishlist,
        },
      });

      expect(trackSpy).toHaveBeenCalledWith(EventType.ProductAddedToWishlist, {
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
        sizeId: size.id,
        sizeScaleId: size.scale,
        value,
        variant: colorName,
        wishlistId: wishlistMockData.wishlistId,
        locationId: expect.any(String),
        isMainWishlist,
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
          isMainWishlist,
        },
      });

      expect(trackSpy).toHaveBeenCalledWith(
        EventType.ProductRemovedFromWishlist,
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
          sizeId: size.id,
          sizeScaleId: size.scale,
          value,
          variant: colorName,
          wishlistId: wishlistMockData.wishlistId,
          locationId: expect.any(String),
          isMainWishlist,
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
            wishlistSetId,
            isMainWishlist,
          },
        });

        expect(trackSpy).toHaveBeenCalledWith(
          EventType.ProductRemovedFromWishlist,
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
            sizeId: size.id,
            sizeScaleId: size.scale,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
            locationId: expect.any(String),
            isMainWishlist,
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
            wishlistItemId: wishlistMockData.wishListItemId,
            isMainWishlist,
          },
        });

        expect(trackSpy).toHaveBeenCalledWith(
          EventType.ProductRemovedFromWishlist,
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
            sizeId: size.id,
            sizeScaleId: size.scale,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
            locationId: expect.any(String),
            isMainWishlist,
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
            wishlistSetId,
            isMainWishlist,
          },
        });

        expect(trackSpy).toHaveBeenCalledWith(
          EventType.ProductAddedToWishlist,
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
            price: priceWithDiscount,
            priceWithoutDiscount,
            position,
            quantity,
            size: size.name,
            sizeId: size.id,
            sizeScaleId: size.scale,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
            locationId: expect.any(String),
            isMainWishlist,
          },
        );
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
            wishlistSetId,
            wishlistItemId: wishlistMockData.wishListItemId,
            isMainWishlist,
          },
        });

        expect(trackSpy).toHaveBeenCalledWith(
          EventType.ProductAddedToWishlist,
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
            price: priceWithDiscount,
            priceWithoutDiscount,
            position,
            quantity,
            size: size.name,
            sizeId: size.id,
            sizeScaleId: size.scale,
            value,
            variant: colorName,
            wishlistId: wishlistSetId,
            locationId: expect.any(String),
            isMainWishlist,
          },
        );
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

        expect(trackSpy).not.toHaveBeenCalled();
      });
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

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });

  describe('Update item in wishlist', () => {
    const newWishlistItemId = 614727928;
    const newQuantity = 14;
    const newSize = '40';
    const merchantId = 20;
    const sizeId = 1;
    const sizeScaleId = 2;

    const newWishlistItemEntity = {
      [newWishlistItemId]: {
        ...mockWishlistItem,
        dateCreated: 1612194217929,
        id: newWishlistItemId,
        price: {
          includingTaxes: priceWithDiscount,
          includingTaxesWithoutDiscount: priceWithoutDiscount,
          formatted: {
            includingTaxes: `${priceWithDiscount}`,
            includingTaxesWithoutDiscount: `${priceWithoutDiscount}`,
          },
          isFormatted: true,
          taxes: {
            amount: 0,
            rate: 0,
            type: 'VAT',
          },
        },
        size: {
          name: newSize,
          id: sizeId,
          scale: sizeScaleId,
          scaleDescription: 'dummy_scale_description',
          scaleAbbreviation: 'dummy_scale_abbreviation',
          globalQuantity: 1,
        },
        product: wishlistMockData.productId,
        quantity: newQuantity,
        merchant: merchantId,
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
          from: FromParameterType.Wishlist,
          list: wishlistName,
          listId: wishlistMockData.wishlistId,
          position,
          productId: wishlistMockData.productId,
          wishlistItemId: wishlistMockData.wishListItemId,
          merchantId,
        },
      });

      expect(trackSpy).toHaveBeenNthCalledWith(1, EventType.ProductUpdated, {
        affiliation,
        brand: brandName,
        category: categoryName,
        coupon,
        currency: currencyCode,
        discountValue: discount,
        from: FromParameterType.Wishlist,
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
        oldSize: undefined,
        oldSizeId: undefined,
        oldSizeScaleId: undefined,
        oldQuantity: undefined,
        sizeId,
        sizeScaleId,
        locationId: merchantId.toString(),
      });

      expect(trackSpy).toHaveBeenNthCalledWith(
        2,
        EventType.ProductUpdatedWishlist,
        {
          affiliation,
          brand: brandName,
          category: categoryName,
          coupon,
          currency: currencyCode,
          discountValue: discount,
          from: FromParameterType.Wishlist,
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
          oldSize: undefined,
          oldSizeId: undefined,
          oldSizeScaleId: undefined,
          oldQuantity: undefined,
          sizeId,
          sizeScaleId,
          locationId: merchantId.toString(),
        },
      );
    });

    it('should trigger ProductUpdated event when the product size is updated on wishlist, with sizeId property assigned on event payload.', async () => {
      const size = { id: 999, name: 'XXL' };
      const mockStore = mockSimplifiedStore(getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);

      await mockStore.dispatch({
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        payload: {
          entities: {
            wishlistItems: {
              [wishlistItem.id]: {
                ...getMockState()?.entities?.wishlistItems?.[wishlistItem.id],
                id: wishlistItem.id,
                product: wishlistItem.product,
                size,
              },
            },
          },
        },
        meta: {
          productId: wishlistItem.product,
          size: size.id,
          from: FromParameterType.Wishlist,
        },
      });

      // expect trigger analytics product updated event
      expect(trackSpy).toHaveBeenNthCalledWith(
        1,
        EventType.ProductUpdated,
        expect.objectContaining({ sizeId: size.id }),
      );
    });

    it('should trigger ProductUpdated and ProductAddedToWishlist when product quantity is incremented on wishlist', async () => {
      const mockStore = mockSimplifiedStore(getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);

      await mockStore.dispatch({
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        payload: {
          entities: {
            wishlistItems: {
              [wishlistItem.id]: {
                ...getMockState()?.entities?.wishlistItems?.[wishlistItem.id],
                id: wishlistItem.id,
                product: wishlistItem.product,
                quantity:
                  (getMockState()?.entities?.wishlistItems?.[wishlistItem.id]
                    ?.quantity || 0) + 1,
              },
            },
          },
        },
        meta: {
          productId: wishlistItem.product,
          from: FromParameterType.Wishlist,
          quantity:
            (getMockState()?.entities?.wishlistItems?.[wishlistItem.id]
              ?.quantity || 0) + 1,
        },
      });

      // expect trigger analytics product updated event
      expect(trackSpy).toHaveBeenNthCalledWith(
        1,
        EventType.ProductUpdated,
        expect.objectContaining({
          quantity:
            (getMockState()?.entities?.wishlistItems?.[wishlistItem.id]
              ?.quantity || 0) + 1,
        }),
      );

      expect(trackSpy).toHaveBeenNthCalledWith(
        3,
        EventType.ProductAddedToWishlist,
        expect.objectContaining({
          quantity: 1,
        }),
      );
    });

    it('should trigger ProductAddedToWishlist event when a product quantity is incremented on a PDP', async () => {
      const mockStore = mockSimplifiedStore(getMockState(), [
        analyticsWishlistMiddleware(analytics),
      ]);

      await mockStore.dispatch({
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        payload: {
          entities: {
            wishlistItems: {
              [wishlistItem.id]: {
                ...getMockState()?.entities?.wishlistItems?.[wishlistItem.id],
                id: wishlistItem.id,
                product: wishlistItem.product,
                quantity:
                  (getMockState()?.entities?.wishlistItems?.[wishlistItem.id]
                    ?.quantity || 0) + 1,
              },
            },
          },
        },
        meta: {
          productId: wishlistItem.product,
          from: FromParameterType.Pdp,
          quantity:
            (getMockState()?.entities?.wishlistItems?.[wishlistItem.id]
              ?.quantity || 0) + 1,
        },
      });

      expect(trackSpy).toHaveBeenNthCalledWith(
        2,
        EventType.ProductAddedToWishlist,
        expect.objectContaining({
          quantity: 1,
        }),
      );
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

      expect(trackSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle a custom action type for update wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeUpdateWishlist,
        payload: {},
        meta: {
          productId: wishlistMockData.productId,
        },
      });

      expect(trackSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle a custom action type for remove from wishlist action', async () => {
      await store.dispatch({
        type: myActionTypeRemoveFromWishlist,
        payload: {},
        meta: {
          productId: wishlistMockData.productId,
        },
      });

      expect(trackSpy).toHaveBeenCalledTimes(1);
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

      expect(trackSpy).toHaveBeenCalledTimes(1);
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

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });
});
