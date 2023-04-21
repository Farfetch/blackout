import * as actionTypes from '../../actionTypes.js';
import { deleteWishlistSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { removeWishlistSet } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteWishlistSet: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('removeWishlistSet() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the remove wishlist set procedure fails', async () => {
    const expectedError = new Error('remove wishlist set error');

    (deleteWishlistSet as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeWishlistSet(
          mockWishlistId,
          mockWishlistSetId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteWishlistSet).toHaveBeenCalledTimes(1);
    expect(deleteWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        payload: { error: expectedError },
        type: actionTypes.REMOVE_WISHLIST_SET_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the remove wishlist set procedure is successful', async () => {
    (deleteWishlistSet as jest.Mock).mockResolvedValueOnce(undefined);

    await removeWishlistSet(
      mockWishlistId,
      mockWishlistSetId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(deleteWishlistSet).toHaveBeenCalledTimes(1);
    expect(deleteWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
      },
    ]);
  });
});
