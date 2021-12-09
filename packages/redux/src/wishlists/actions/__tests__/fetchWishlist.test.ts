import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import { fetchWishlist } from '../';
import { getWishlist } from '@farfetch/blackout-client/wishlists';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/wishlists', () => ({
  ...jest.requireActual('@farfetch/blackout-client/wishlists'),
  getWishlist: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];
const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchWishlist()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore();
  });

  it('should create the correct actions for when the fetch wishlist procedure fails', async () => {
    const expectedError = new Error('fetch wishlist error');

    getWishlist.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchWishlist(mockWishlistId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getWishlist).toHaveBeenCalledTimes(1);
      expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
      expect(store.getActions()).toEqual([
        { type: actionTypes.FETCH_WISHLIST_REQUEST },
        {
          type: actionTypes.FETCH_WISHLIST_FAILURE,
          payload: { error: expectedError },
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch wishlist procedure is successful', async () => {
    getWishlist.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(7);

    await store.dispatch(fetchWishlist(mockWishlistId)).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(normalizeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            productImgQueryParam: mockProductImgQueryParam,
          }),
        ]),
      }),
      expect.anything(),
    );
    expect(getWishlist).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
    expect(storeActions).toMatchObject([
      { type: actionTypes.FETCH_WISHLIST_REQUEST },
      {
        type: actionTypes.FETCH_WISHLIST_SUCCESS,
        payload: mockWishlistNormalizedPayload,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot('Fetch wishlist success payload');
  });

  it('should create the correct actions for when the fetch wishlist procedure is successful without `getOptions`', async () => {
    store = wishlistMockStoreWithoutMiddlewares();
    getWishlist.mockResolvedValueOnce(mockWishlistsResponse);

    expect.assertions(5);

    await store.dispatch(fetchWishlist(mockWishlistId)).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledTimes(1);
    expect(getWishlist).toHaveBeenCalledWith(mockWishlistId, expectedConfig);
    expect(store.getActions()).toMatchObject([
      { type: actionTypes.FETCH_WISHLIST_REQUEST },
      {
        type: actionTypes.FETCH_WISHLIST_SUCCESS,
        payload: mockWishlistNormalizedPayload,
      },
    ]);
  });
});
