import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { addWishlistItem } from '..//index.js';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemPostData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { postWishlistItem } from '@farfetch/blackout-client';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postWishlistItem: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const data = mockWishlistItemPostData;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
const wishlistItemMetadata = {
  from: 'bag',
  oldQuantity: 1,
  oldSize: 16,
};

let store: ReturnType<typeof wishlistMockStore>;

describe('addWishlistItem()', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      addWishlistItem(data)(
        store.dispatch,
        store.getState as () => StoreState,
        { getOptions },
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toHaveLength(1);
  });

  it('should create the correct actions for when adding a wishlist item procedure fails', async () => {
    const expectedError = new Error('post wishlist item error');
    const data = { productId: mockProductId, quantity: 1 };

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    (postWishlistItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await addWishlistItem(data, wishlistItemMetadata)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(postWishlistItem).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { ...wishlistItemMetadata, productId: mockProductId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: { ...wishlistItemMetadata, productId: mockProductId },
        payload: { error: expectedError },
        type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    (postWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await addWishlistItem(data, wishlistItemMetadata)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(normalizeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            productImgQueryParam: mockProductImgQueryParam,
          }),
        ]),
      }),
      expect.anything(),
    );
    expect(postWishlistItem).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      {
        meta: { ...wishlistItemMetadata, productId: mockProductId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: { ...wishlistItemMetadata, productId: mockProductId },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Add wishlist item success payload',
    );
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful without getOptions', async () => {
    store = wishlistMockStoreWithoutMiddlewares({
      wishlist: { id: mockWishlistId },
    });
    (postWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await addWishlistItem(data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toMatchObject([
      {
        meta: { productId: mockProductId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
      },
    ]);
  });
});
