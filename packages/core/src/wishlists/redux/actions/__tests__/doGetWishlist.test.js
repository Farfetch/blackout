import { doGetWishlist } from '../';
import { mockStore } from '../../../../../tests';
import {
  mockWishlistId,
  mockWishlistNormalizedPayload,
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
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: reducer() }, state);

describe('doGetWishlist()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getWishlist = jest.fn();
  const action = doGetWishlist(getWishlist);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore();
  });

  it('should create the correct actions for when the get wishlist procedure fails', async () => {
    const expectedError = new Error('get wishlist error');

    getWishlist.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getWishlist).toHaveBeenCalledTimes(1);
      expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_WISHLIST_REQUEST },
          {
            type: actionTypes.GET_WISHLIST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get wishlist procedure is successful', async () => {
    getWishlist.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_WISHLIST_REQUEST },
      {
        type: actionTypes.GET_WISHLIST_SUCCESS,
        payload: mockWishlistNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('get wishlist success payload');
  });

  it('should create the correct actions for when the get wishlist procedure is successful without receiving options', async () => {
    store = wishlistMockStoreWithoutMiddlewares();

    getWishlist.mockResolvedValueOnce(mockWishlistsResponse);
    await store.dispatch(action(mockWishlistId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_WISHLIST_REQUEST },
      {
        type: actionTypes.GET_WISHLIST_SUCCESS,
        payload: mockWishlistNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_WISHLIST_SUCCESS }),
    ).toMatchSnapshot('get wishlist success payload without receiving options');
  });
});
