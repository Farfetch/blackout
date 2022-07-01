import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { addWishlistItem } from '../';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductId,
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistItemPostData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import { postWishlistItem } from '@farfetch/blackout-client';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postWishlistItem: jest.fn(),
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
const data = mockWishlistItemPostData;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('addWishlistItem()', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      store.dispatch(addWishlistItem(data)),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toHaveLength(1);
  });

  it('should create the correct actions for when adding a wishlist item procedure fails', async () => {
    const expectedError = new Error('post wishlist item error');
    const data = { productId: mockProductId };

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(addWishlistItem(data)).catch(error => {
      expect(error).toBe(expectedError);
      expect(postWishlistItem).toHaveBeenCalledTimes(1);
      expect(postWishlistItem).toHaveBeenCalledWith(
        mockWishlistId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(7);

    await store.dispatch(addWishlistItem(data)).then(clientResult => {
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
        meta: { productId: mockProductId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
      },
    ]);
    expect(storeActions[2]).toMatchSnapshot(
      'Add wishlist item success payload',
    );
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful without getOptions', async () => {
    store = wishlistMockStoreWithoutMiddlewares({
      wishlist: { id: mockWishlistId },
    });
    postWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(5);

    await store.dispatch(addWishlistItem(data)).then(clientResult => {
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
