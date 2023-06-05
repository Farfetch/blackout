import * as actionTypes from '../actionTypes';
import { find } from 'lodash';
import { INITIAL_STATE } from '../reducer';
import {
  mockSharedWishlistId,
  mockSharedWishlistState,
} from '../../../../../../tests/__fixtures__/sharedWishlists/sharedWishlist.fixtures';
import { mockStore } from '../../../../tests';
import doDeleteSharedWishlist from '../actions/doDeleteSharedWishlist';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ sharedWishlist: INITIAL_STATE }, state, mockMiddlewares);

describe('doDeleteSharedWishlist()', () => {
  let store;
  const deleteSharedWishlist = jest.fn();
  const action = doDeleteSharedWishlist(deleteSharedWishlist);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore(mockSharedWishlistState);
  });

  it('should create the correct actions for when the remove shared wishlist procedure fails', async () => {
    const expectedError = new Error('delete shared wishlist error');

    deleteSharedWishlist.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSharedWishlistId));
    } catch (error) {
      expect(error).toEqual(expectedError);
      expect(deleteSharedWishlist).toHaveBeenCalledTimes(1);
      expect(deleteSharedWishlist).toHaveBeenCalledWith(
        mockSharedWishlistId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
          },
          {
            payload: { error: expectedError },
            type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the remove shared wishlist procedure is successful', async () => {
    deleteSharedWishlist.mockResolvedValueOnce(200);

    await store.dispatch(action(mockSharedWishlistId));

    const actionResults = store.getActions();

    expect(deleteSharedWishlist).toHaveBeenCalledTimes(1);
    expect(deleteSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
      },
      {
        type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('delete shared wishlist success payload');
  });
});
