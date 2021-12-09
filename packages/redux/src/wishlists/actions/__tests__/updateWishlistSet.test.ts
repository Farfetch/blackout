import { actionTypes } from '../../';
import {
  getWishlistSet,
  patchWishlistSet,
} from '@farfetch/blackout-client/wishlists';
import { INITIAL_STATE } from '../../reducer/wishlists';
import { mockStore } from '../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistSetPatchData,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import { updateWishlistSet } from '../';

jest.mock('@farfetch/blackout-client/wishlists', () => ({
  ...jest.requireActual('@farfetch/blackout-client/wishlists'),
  patchWishlistSet: jest.fn(),
  getWishlistSet: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const data = mockWishlistSetPatchData;
const expectedConfig = undefined;
let store;

describe('updateWishlistSet()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the delete wishlist set procedure fails', async () => {
    const expectedError = new Error('update wishlist set error');

    patchWishlistSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(updateWishlistSet(mockWishlistSetId, data))
      .catch(error => {
        expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the update wishlist set procedure is successful', async () => {
    patchWishlistSet.mockResolvedValueOnce();
    getWishlistSet.mockResolvedValueOnce(mockWishlistsSetResponse);

    expect.assertions(4);

    await store
      .dispatch(updateWishlistSet(mockWishlistSetId, data))
      .then(clientResult => {
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
