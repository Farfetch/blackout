import * as actionTypes from '../actionTypes';
import { find } from 'lodash';
import { INITIAL_STATE } from '../reducer';
import {
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistsResponse,
} from '../../../../../../tests/__fixtures__/sharedWishlists/sharedWishlist.fixtures';
import { mockStore } from '../../../../tests';
import doFetchSharedWishlist from '../actions/doFetchSharedWishlist';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ sharedWishlist: INITIAL_STATE }, state, mockMiddlewares);

describe('doFetchSharedWishlist()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getSharedWishlist = jest.fn();
  const action = doFetchSharedWishlist(getSharedWishlist);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore();
  });

  it('should create the correct actions for when fetch a shared wishlist procedure fails', async () => {
    const expectedError = new Error('get shared wishlist error');

    getSharedWishlist.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockSharedWishlistId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSharedWishlist).toHaveBeenCalledTimes(1);
      expect(getSharedWishlist).toHaveBeenCalledWith(
        mockSharedWishlistId,
        expectedConfig,
      );
      expect(store.getActions()).toMatchObject([
        {
          type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST,
        },
        {
          type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
          payload: { error: expectedError },
        },
      ]);
    }
  });

  it('should create the correct actions for when fetch a shared wishlist procedure is successful', async () => {
    getSharedWishlist.mockResolvedValueOnce(mockSharedWishlistsResponse);
    await store.dispatch(action(mockSharedWishlistId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSharedWishlist).toHaveBeenCalledTimes(1);
    expect(getSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST },
      {
        payload: {
          ...mockSharedWishlistNormalizedPayload,
          result: mockSharedWishlistId,
        },
        type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('get shared wishlist success payload');
  });
});
