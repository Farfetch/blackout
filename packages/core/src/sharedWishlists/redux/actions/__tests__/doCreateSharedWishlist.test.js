import * as actionTypes from '../../actionTypes';
import { find } from 'lodash';
import { INITIAL_STATE } from '../../reducer';
import {
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistPostData,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../../tests';
import doCreateSharedWishlist from '../../actions/doCreateSharedWishlist';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ sharedWishlist: INITIAL_STATE }, state, mockMiddlewares);

describe('doCreateSharedWishlist()', () => {
  let store;
  const postSharedWishlist = jest.fn();
  const action = doCreateSharedWishlist(postSharedWishlist);
  const data = mockSharedWishlistPostData;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore({
      sharedWishlist: {},
    });
  });

  it('should create the correct actions for when create a shared wishlist procedure fails', async () => {
    const expectedError = new Error('post shared wishlist error');

    postSharedWishlist.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postSharedWishlist).toHaveBeenCalledTimes(1);
      expect(postSharedWishlist).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toHaveLength(2);
    }
  });

  it('should create the correct actions for when the create a shared wishlist procedure is successful', async () => {
    postSharedWishlist.mockResolvedValueOnce(mockSharedWishlistsResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postSharedWishlist).toHaveBeenCalledTimes(1);
    expect(postSharedWishlist).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST },
      {
        payload: {
          ...mockSharedWishlistNormalizedPayload,
          result: mockSharedWishlistId,
        },
        type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('create shared wishlist success payload');
  });
});
