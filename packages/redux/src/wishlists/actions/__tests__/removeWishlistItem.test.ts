import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { deleteWishlistItem } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
  wishlistItemMetadata,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { removeWishlistItem } from '..//index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteWishlistItem: jest.fn(),
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
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;

let store: ReturnType<typeof wishlistMockStore>;

describe('removeWishlistItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockWishlistState);
  });

  it('should create the correct actions for when the remove wishlist item procedure fails', async () => {
    const expectedError = new Error('remove wishlist item error');

    (deleteWishlistItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeWishlistItem(
          mockWishlistId,
          mockWishlistItemId,
          wishlistItemMetadata,
        )(store.dispatch, store.getState as () => StoreState, { getOptions }),
    ).rejects.toThrow(expectedError);

    expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: { error: expectedError },
        type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the remove wishlist item procedure is successful', async () => {
    (deleteWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await removeWishlistItem(
      mockWishlistId,
      mockWishlistItemId,
      wishlistItemMetadata,
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBe(mockWishlistsResponse);
      },
    );

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
    expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Remove wishlist item success payload',
    );
  });

  it('should create the correct actions for when the remove wishlist item procedure is successful without `getOptions`', async () => {
    store = wishlistMockStoreWithoutMiddlewares(mockWishlistState);

    (deleteWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await removeWishlistItem(mockWishlistId, mockWishlistItemId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      expectedConfig,
    );
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
      },
    ]);
  });
});
