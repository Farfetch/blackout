import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchWishlistSets } from '..//index.js';
import { getWishlistSets } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getWishlistSets: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('fetchWishlistSets()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the fetch wishlist sets procedure fails', async () => {
    const expectedError = new Error('fetch wishlist sets error');

    (getWishlistSets as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchWishlistSets()(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(getWishlistSets).toHaveBeenCalledTimes(1);
    expect(getWishlistSets).toHaveBeenCalledWith(
      mockWishlistId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_WISHLIST_SETS_REQUEST },
        {
          type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch wishlist sets procedure is successful', async () => {
    const response = [mockWishlistsSetResponse];

    (getWishlistSets as jest.Mock).mockResolvedValueOnce(response);

    await fetchWishlistSets()(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBe(response);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlistSets).toHaveBeenCalledTimes(1);
    expect(getWishlistSets).toHaveBeenCalledWith(
      mockWishlistId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      { type: actionTypes.FETCH_WISHLIST_SETS_REQUEST },
      {
        payload: {
          ...mockWishlistsSetNormalizedPayload,
          result: [mockWishlistSetId],
        },
        type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Fetch wishlist sets success payload',
    );
  });
});
