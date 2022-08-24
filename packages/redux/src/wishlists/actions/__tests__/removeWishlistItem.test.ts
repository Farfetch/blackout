import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { deleteWishlistItem } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
  wishlistItemMetadata,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import { removeWishlistItem } from '../';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

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

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      removeWishlistItem(mockWishlistItemId)(
        store.dispatch,
        store.getState as () => StoreState,
        { getOptions },
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
          payload: {
            error: expect.objectContaining({
              message: 'No wishlist id is set',
              code: -1,
            }),
          },
        }),
      ]),
    );
  });

  it('should create the correct actions for when the remove wishlist item procedure fails', async () => {
    const expectedError = new Error('remove wishlist item error');

    (deleteWishlistItem as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await removeWishlistItem(mockWishlistItemId, wishlistItemMetadata)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
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
  });

  it('should create the correct actions for when the remove wishlist item procedure is successful', async () => {
    (deleteWishlistItem as jest.Mock).mockResolvedValueOnce(
      mockWishlistsResponse,
    );

    expect.assertions(7);

    await removeWishlistItem(mockWishlistItemId, wishlistItemMetadata)(
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

    expect.assertions(5);

    await removeWishlistItem(mockWishlistItemId)(
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
