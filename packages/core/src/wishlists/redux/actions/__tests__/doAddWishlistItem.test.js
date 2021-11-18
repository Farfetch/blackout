import { doAddWishlistItem } from '../';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemPostData,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
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

describe('doAddWishlistItem()', () => {
  let store;
  const data = mockWishlistItemPostData;
  const postWishlistItem = jest.fn();
  const action = doAddWishlistItem(postWishlistItem);
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });
    expect.assertions(2);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toMatchSnapshot();
      expect(store.getActions()).toHaveLength(0);
    }
  });

  it('should create the correct actions for when adding a wishlist item procedure fails', async () => {
    const expectedError = new Error('post wishlist item error');
    const data = { foo: 'foo' };

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postWishlistItem).toHaveBeenCalledTimes(1);
      expect(postWishlistItem).toHaveBeenCalledWith(
        mockWishlistId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST },
          {
            payload: { error: expectedError },
            type: actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postWishlistItem).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST },
      {
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        meta: {
          productId: mockProductId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        meta: {
          productId: mockProductId,
        },
      }),
    ).toMatchSnapshot('add wishlist item success payload');
  });

  it('should create the correct actions for when the adding a wishlist item procedure is successful without receiving options', async () => {
    store = wishlistMockStoreWithoutMiddlewares({
      wishlist: { id: mockWishlistId },
    });

    postWishlistItem.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postWishlistItem).toHaveBeenCalledTimes(1);
    expect(postWishlistItem).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST },
      {
        payload: mockWishlistNormalizedPayload,
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        meta: {
          productId: mockProductId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        meta: {
          productId: mockProductId,
        },
      }),
    ).toMatchSnapshot(
      'add wishlist item success payload without receiving options',
    );
  });
});
