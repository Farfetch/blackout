import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
  wishlistItemMetadata,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { patchWishlistItem } from '@farfetch/blackout-client';
import { updateWishlistItem } from '..//index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchWishlistItem: jest.fn(),
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
const data = mockWishlistItemPatchData;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;

let store: ReturnType<typeof wishlistMockStore>;

describe('updateWishlistItem()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockWishlistState);
  });

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      updateWishlistItem(mockWishlistItemId, data)(
        store.dispatch,
        store.getState as () => StoreState,
        { getOptions },
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
          payload: {
            error: expect.objectContaining({
              message: 'No wishlist id is set',
              code: '-1',
            }),
          },
        }),
      ]),
    );
  });

  it('should create the correct actions for when updating a wishlist item procedure fails', async () => {
    const expectedError = new Error('update wishlist item error');

    (patchWishlistItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateWishlistItem(
          mockWishlistItemId,
          data,
          wishlistItemMetadata,
        )(store.dispatch, store.getState as () => StoreState, { getOptions }),
    ).rejects.toThrow(expectedError);

    expect(patchWishlistItem).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: { error: expectedError },
        type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the update wishlist item procedure is successful', async () => {
    (patchWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await updateWishlistItem(mockWishlistItemId, data, wishlistItemMetadata)(
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
    expect(patchWishlistItem).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      data,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          ...wishlistItemMetadata,
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Update wishlist item success payload',
    );
  });

  it('should create the correct actions for when the update wishlist item procedure is successful without `getOptions`', async () => {
    store = wishlistMockStoreWithoutMiddlewares(mockWishlistState);
    (patchWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    await updateWishlistItem(mockWishlistItemId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
      },
    ]);
  });
});
