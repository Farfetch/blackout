import { doDeleteWishlistSet } from '../';
import { mockStore } from '../../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsResponse,
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

describe('doDeleteWishlistSet() action creator', () => {
  let store;
  const deleteWishlistsSet = jest.fn();
  const action = doDeleteWishlistSet(deleteWishlistsSet);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the delete wishlist set procedure fails', async () => {
    const expectedError = new Error('delete wishlist set error');

    deleteWishlistsSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistSetId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteWishlistsSet).toHaveBeenCalledTimes(1);
      expect(deleteWishlistsSet).toHaveBeenCalledWith(
        mockWishlistId,
        mockWishlistSetId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { wishlistSetId: mockWishlistSetId },
            type: actionTypes.DELETE_WISHLIST_SET_REQUEST,
          },
          {
            meta: { wishlistSetId: mockWishlistSetId },
            payload: { error: expectedError },
            type: actionTypes.DELETE_WISHLIST_SET_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete wishlist set procedure is successful', async () => {
    deleteWishlistsSet.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistSetId));

    const actionResults = store.getActions();

    expect(deleteWishlistsSet).toHaveBeenCalledTimes(1);
    expect(deleteWishlistsSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.DELETE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
      }),
    ).toMatchSnapshot('delete wishlist set success payload');
  });
});
