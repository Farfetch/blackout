import * as actionTypes from '../../actionTypes';
import { find } from 'lodash';
import { INITIAL_STATE } from '../../reducer';
import {
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistsResponse,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists/sharedWishlist.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateSharedWishlist from '../doUpdateSharedWishlist';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ sharedWishlist: INITIAL_STATE }, state, mockMiddlewares);

describe('doUpdateSharedWishlist()', () => {
  let store;
  const putSharedWishlist = jest.fn();
  const action = doUpdateSharedWishlist(putSharedWishlist);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore(mockSharedWishlistState);
  });

  it('should create the correct actions for when updating a shared wishlist procedure fails', async () => {
    const expectedError = new Error('update shared wishlist error');

    putSharedWishlist.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSharedWishlistId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putSharedWishlist).toHaveBeenCalledTimes(1);
      expect(putSharedWishlist).toHaveBeenCalledWith(
        mockSharedWishlistId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
          },
          {
            type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update shared wishlist procedure is successful', async () => {
    putSharedWishlist.mockResolvedValueOnce(mockSharedWishlistsResponse);
    await store.dispatch(action(mockSharedWishlistId));

    const actionResults = store.getActions();

    expect(putSharedWishlist).toHaveBeenCalledTimes(1);
    expect(putSharedWishlist).toHaveBeenLastCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST },
      {
        payload: mockSharedWishlistNormalizedPayload,
        type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('update shared wishlist success payload');
  });
});
