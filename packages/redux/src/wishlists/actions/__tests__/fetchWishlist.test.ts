import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchWishlist } from '../';
import { getWishlist } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists';
import {
  mockProductImgQueryParam,
  mockWishlistId,
  mockWishlistNormalizedPayload,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getWishlist: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);
const wishlistMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('fetchWishlist()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore();
  });

  it('should create the correct actions for when the fetch wishlist procedure fails', async () => {
    const expectedError = new Error('fetch wishlist error');

    (getWishlist as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchWishlist(mockWishlistId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

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

  it('should create the correct actions for when the fetch wishlist procedure is successful', async () => {
    (getWishlist as jest.Mock).mockResolvedValueOnce(mockWishlistsResponse);

    await fetchWishlist(mockWishlistId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
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
    (getWishlist as jest.Mock).mockResolvedValueOnce(mockWishlistsResponse);

    await fetchWishlist(mockWishlistId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
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
