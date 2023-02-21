import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchSharedWishlist } from '..';
import { getSharedWishlist } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockProductImgQueryParam,
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSharedWishlist: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof sharedWishlistMockStore>;

describe('fetchSharedWishlist()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore();
  });

  it('should create the correct actions for when the fetch shared wishlist procedure fails', async () => {
    const expectedError = new Error('fetch wishlist error');

    (getSharedWishlist as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchSharedWishlist(mockSharedWishlistId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(getSharedWishlist).toHaveBeenCalledTimes(1);
    expect(getSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST },
      {
        type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions for when the fetch shared wishlist procedure is successful', async () => {
    (getSharedWishlist as jest.Mock).mockResolvedValueOnce(
      mockSharedWishlistsResponse,
    );

    await fetchSharedWishlist(mockSharedWishlistId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockSharedWishlistsResponse);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSharedWishlist).toHaveBeenCalledTimes(1);
    expect(getSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      { type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST },
      {
        type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
        payload: mockSharedWishlistNormalizedPayload,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Fetch shared wishlist success payload',
    );
  });
});
