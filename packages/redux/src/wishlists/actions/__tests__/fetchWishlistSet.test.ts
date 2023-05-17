import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchWishlistSet } from '..//index.js';
import { getWishlistSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getWishlistSet: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('fetchWishlistSet()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the fetch wishlist set procedure fails', async () => {
    const expectedError = new Error('fetch wishlist set error');

    (getWishlistSet as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchWishlistSet(
          mockWishlistId,
          mockWishlistSetId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getWishlistSet).toHaveBeenCalledTimes(1);
    expect(getWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.FETCH_WISHLIST_SET_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions for when the fetch wishlist set procedure is successful', async () => {
    (getWishlistSet as jest.Mock).mockResolvedValueOnce(
      mockWishlistsSetResponse,
    );

    await fetchWishlistSet(
      mockWishlistId,
      mockWishlistSetId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsSetResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlistSet).toHaveBeenCalledTimes(1);
    expect(getWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        payload: mockWishlistsSetNormalizedPayload,
        type: actionTypes.FETCH_WISHLIST_SET_SUCCESS,
      },
    ]);
  });
});
