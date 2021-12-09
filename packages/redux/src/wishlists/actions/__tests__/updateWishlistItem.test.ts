import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import { patchWishlistItem } from '@farfetch/blackout-client/wishlists';
import { updateWishlistItem } from '../';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/wishlists', () => ({
  ...jest.requireActual('@farfetch/blackout-client/wishlists'),
  patchWishlistItem: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];
const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const data = mockWishlistItemPatchData;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('updateWishlistItem()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockWishlistState);
  });

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      store.dispatch(updateWishlistItem(mockWishlistItemId, data)),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toHaveLength(0);
  });

  it('should create the correct actions for when updating a wishlist item procedure fails', async () => {
    const expectedError = new Error('update wishlist item error');

    patchWishlistItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(updateWishlistItem(mockWishlistItemId, data))
      .catch(error => {
        expect(error).toBe(expectedError);
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
            payload: { error: expectedError },
            type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the update wishlist item procedure is successful', async () => {
    patchWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(7);

    await store
      .dispatch(updateWishlistItem(mockWishlistItemId, data))
      .then(clientResult => {
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
    expect(storeActions[1]).toMatchSnapshot(
      'Update wishlist item success payload',
    );
  });

  it('should create the correct actions for when the update wishlist item procedure is successful without `getOptions`', async () => {
    store = wishlistMockStoreWithoutMiddlewares(mockWishlistState);
    patchWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(5);

    await store
      .dispatch(updateWishlistItem(mockWishlistItemId, data))
      .then(clientResult => {
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
