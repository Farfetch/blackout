import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import { fetchWishlistSets } from '../';
import { getWishlistSets } from '@farfetch/blackout-client/wishlists';
import { INITIAL_STATE } from '../../reducer/wishlists';
import { mockStore } from '../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';

jest.mock('@farfetch/blackout-client/wishlists', () => ({
  ...jest.requireActual('@farfetch/blackout-client/wishlists'),
  getWishlistSets: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchWishlistSets()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the fetch wishlist sets procedure fails', async () => {
    const expectedError = new Error('fetch wishlist sets error');

    getWishlistSets.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchWishlistSets()).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the fetch wishlist sets procedure is successful', async () => {
    const response = [mockWishlistsSetResponse];
    getWishlistSets.mockResolvedValueOnce(response);

    expect.assertions(6);

    await store.dispatch(fetchWishlistSets()).then(clientResult => {
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
