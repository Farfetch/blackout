import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { addWishlistSet } from '..//index.js';
import { INITIAL_STATE } from '../../reducer/wishlists.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { postWishlistSet } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postWishlistSet: jest.fn(),
}));

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state);
const data = mockWishlistsSetResponse;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof wishlistMockStore>;

describe('addWishlistSet()', () => {
  beforeEach(jest.clearAllMocks);

  it('should create the correct actions for when adding a wishlist set procedure fails', async () => {
    const expectedError = new Error('post wishlist set error');

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    (postWishlistSet as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await addWishlistSet(mockWishlistId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postWishlistSet).toHaveBeenCalledTimes(1);
    expect(postWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.ADD_WISHLIST_SET_REQUEST },
      {
        payload: { error: expectedError },
        type: actionTypes.ADD_WISHLIST_SET_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the adding a wishlist set procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    (postWishlistSet as jest.Mock).mockResolvedValueOnce(
      mockWishlistsSetResponse,
    );

    await addWishlistSet(
      mockWishlistId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockWishlistsSetResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postWishlistSet).toHaveBeenCalledTimes(1);
    expect(postWishlistSet).toHaveBeenCalledWith(
      mockWishlistId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.ADD_WISHLIST_SET_REQUEST },
      {
        payload: {
          ...mockWishlistsSetNormalizedPayload,
          result: mockWishlistSetId,
        },
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      },
    ]);
  });
});
