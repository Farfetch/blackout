import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import { deleteWishlistItem } from '@farfetch/blackout-client/wishlists';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import { removeWishlistItem } from '../';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/wishlists', () => ({
  ...jest.requireActual('@farfetch/blackout-client/wishlists'),
  deleteWishlistItem: jest.fn(),
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
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('removeWishlistItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockWishlistState);
  });

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      store.dispatch(removeWishlistItem(mockWishlistItemId)),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toHaveLength(0);
  });

  it('should create the correct actions for when the remove wishlist item procedure fails', async () => {
    const expectedError = new Error('remove wishlist item error');

    deleteWishlistItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(removeWishlistItem(mockWishlistItemId))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
        expect(deleteWishlistItem).toHaveBeenCalledWith(
          mockWishlistId,
          mockWishlistItemId,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
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
            payload: { error: expectedError },
            type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the remove wishlist item procedure is successful', async () => {
    deleteWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(7);

    await store
      .dispatch(removeWishlistItem(mockWishlistItemId))
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
    expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
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
    expect(storeActions[1]).toMatchSnapshot(
      'Remove wishlist item success payload',
    );
  });

  it('should create the correct actions for when the remove wishlist item procedure is successful without `getOptions`', async () => {
    store = wishlistMockStoreWithoutMiddlewares(mockWishlistState);

    deleteWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(5);

    await store
      .dispatch(removeWishlistItem(mockWishlistItemId))
      .then(clientResult => {
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
