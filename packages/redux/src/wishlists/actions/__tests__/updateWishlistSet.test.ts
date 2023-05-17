import * as actionTypes from '../../actionTypes.js';
import { getWishlistSet, patchWishlistSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { updateWishlistSet } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchWishlistSet: jest.fn(),
  getWishlistSet: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const data = mockWishlistSetPatchData;
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('updateWishlistSet()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the delete wishlist set procedure fails', async () => {
    const expectedError = new Error('update wishlist set error');

    (patchWishlistSet as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateWishlistSet(
          mockWishlistId,
          mockWishlistSetId,
          data,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchWishlistSet).toHaveBeenCalledTimes(1);
    expect(patchWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        payload: { error: expectedError },
        type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the update wishlist set procedure is successful', async () => {
    (patchWishlistSet as jest.Mock).mockResolvedValueOnce(
      mockWishlistSetPatchData,
    );
    (getWishlistSet as jest.Mock).mockResolvedValueOnce(
      mockWishlistsSetResponse,
    );

    await updateWishlistSet(
      mockWishlistId,
      mockWishlistSetId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsSetResponse);
    });

    expect(patchWishlistSet).toHaveBeenCalledTimes(1);
    expect(patchWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId, data },
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      },
      // Ensure the `GET` is called
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
