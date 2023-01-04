import * as actionTypes from '../../actionTypes';
import { deleteSharedWishlist } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockSharedWishlistId,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../tests';
import { removeSharedWishlist } from '..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteSharedWishlist: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const expectedConfig = undefined;

let store: ReturnType<typeof wishlistMockStore>;

describe('removeSharedWishlist() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore(mockSharedWishlistState);
  });

  it('should create the correct actions for when the remove shared wishlist procedure fails', async () => {
    const expectedError = new Error('remove shared wishlist error');

    (deleteSharedWishlist as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await removeSharedWishlist(mockSharedWishlistId)(store.dispatch).catch(
      error => {
        expect(error).toBe(expectedError);
        expect(deleteSharedWishlist).toHaveBeenCalledTimes(1);
        expect(deleteSharedWishlist).toHaveBeenCalledWith(
          mockSharedWishlistId,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
          },
          {
            payload: { error: expectedError },
            type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
          },
        ]);
      },
    );
  });

  it('should create the correct actions for when the remove shared wishlist procedure is successful', async () => {
    (deleteSharedWishlist as jest.Mock).mockResolvedValueOnce(200);

    await removeSharedWishlist(mockSharedWishlistId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(200);
      },
    );

    const storeActions = store.getActions();

    expect(deleteSharedWishlist).toHaveBeenCalledTimes(1);
    expect(deleteSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      {
        type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
      },
      {
        type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Remove shared wishlist success payload',
    );
  });
});