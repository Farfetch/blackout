import * as actionTypes from '../../actionTypes';
import { deleteWishlistSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/wishlists';
import { mockStore } from '../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
} from 'tests/__fixtures__/wishlists';
import { removeWishlistSet } from '../';
import type { StoreState } from '../../../types';

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

    expect.assertions(4);

    await removeWishlistSet(mockWishlistSetId)(
      store.dispatch,
      store.getState as () => StoreState,
    ).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the remove wishlist set procedure is successful', async () => {
    (deleteWishlistSet as jest.Mock).mockResolvedValueOnce(undefined);

    expect.assertions(4);

    await removeWishlistSet(mockWishlistSetId)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
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
