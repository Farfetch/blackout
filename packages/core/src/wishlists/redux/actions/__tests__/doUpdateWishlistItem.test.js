import { doUpdateWishlistItem } from '../';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: reducer() }, state, mockMiddlewares);
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: reducer() }, state);

describe('doUpdateWishlistItem()', () => {
  let store;
  const patchWishlistItem = jest.fn();
  const action = doUpdateWishlistItem(patchWishlistItem);
  const data = mockWishlistItemPatchData;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockWishlistState);
  });

  it('should create the correct actions for when updating a wishlist item procedure fails', async () => {
    const expectedError = new Error('update wishlist item error');

    patchWishlistItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistItemId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchWishlistItem).toHaveBeenCalledTimes(1);
      expect(patchWishlistItem).toHaveBeenCalledWith(
        mockWishlistId,
        mockWishlistItemId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { wishlistItemId: mockWishlistItemId },
            type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
          },
          {
            meta: { wishlistItemId: mockWishlistItemId },
            payload: { error: expectedError },
            type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update wishlist item procedure is successful', async () => {
    patchWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistItemId, data));

    const actionResults = store.getActions();

    expect(patchWishlistItem).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST },
      {
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('update wishlist item success payload');
  });

  it('should create the correct actions for when the update wishlist item procedure is successful without receiving options', async () => {
    store = wishlistMockStoreWithoutMiddlewares(mockWishlistState);
    patchWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistItemId, data));

    const actionResults = store.getActions();

    expect(patchWishlistItem).toHaveBeenCalledTimes(1);
    expect(patchWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST },
      {
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update wishlist item success payload without receiving options',
    );
  });
});
