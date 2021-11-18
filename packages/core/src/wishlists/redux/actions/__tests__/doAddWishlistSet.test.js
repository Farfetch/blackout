import { doAddWishlistSet } from '../';
import { mockStore } from '../../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
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

describe('doAddWishlistSet()', () => {
  let store;
  const data = mockWishlistsSetResponse;
  const postWishlistsSet = jest.fn();
  const action = doAddWishlistSet(postWishlistsSet);
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  it('should throw an error if the wishlistId is not set', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    expect.assertions(2);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toMatchSnapshot();
      expect(store.getActions()).toHaveLength(0);
    }
  });

  it('should create the correct actions for when adding a wishlist set procedure fails', async () => {
    const expectedError = new Error('post wishlist set error');

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistsSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postWishlistsSet).toHaveBeenCalledTimes(1);
      expect(postWishlistsSet).toHaveBeenCalledWith(
        mockWishlistId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.ADD_WISHLIST_SET_REQUEST },
          {
            payload: { error: expectedError },
            type: actionTypes.ADD_WISHLIST_SET_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the adding a wishlist set procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistsSet.mockResolvedValueOnce(mockWishlistsSetResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postWishlistsSet).toHaveBeenCalledTimes(1);
    expect(postWishlistsSet).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.ADD_WISHLIST_SET_REQUEST },
      {
        payload: {
          ...mockWishlistsSetNormalizedPayload,
          result: mockWishlistSetId,
        },
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      }),
    ).toMatchSnapshot('add wishlist set success payload');
  });
});
