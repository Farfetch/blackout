import { doDeleteWishlistItem } from '../';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemId,
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

describe('doDeleteWishlistItem() action creator', () => {
  let store;
  const deleteWishlistItem = jest.fn();
  const action = doDeleteWishlistItem(deleteWishlistItem);
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  beforeEach(() => {
    store = wishlistMockStore(mockWishlistState);
  });

  it('should create the correct actions for when the delete wishlist item procedure fails', async () => {
    const expectedError = new Error('delete wishlist item error');

    deleteWishlistItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistItemId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
      expect(deleteWishlistItem).toHaveBeenCalledWith(
        mockWishlistId,
        mockWishlistItemId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { wishlistItemId: mockWishlistItemId },
            type: actionTypes.DELETE_WISHLIST_ITEM_REQUEST,
          },
          {
            meta: { wishlistItemId: mockWishlistItemId },
            payload: { error: expectedError },
            type: actionTypes.DELETE_WISHLIST_ITEM_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete wishlist item procedure is successful', async () => {
    deleteWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistItemId));

    const actionResults = store.getActions();

    expect(deleteWishlistItem).toHaveBeenCalledTimes(1);
    expect(deleteWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistItemId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_WISHLIST_ITEM_REQUEST },
      {
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: mockProductId,
          wishlistItemId: mockWishlistItemId,
        },
      }),
    ).toMatchSnapshot('delete wishlist item success payload');
  });
});
