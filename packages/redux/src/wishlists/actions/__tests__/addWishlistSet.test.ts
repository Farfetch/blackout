import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { addWishlistSet } from '../';
import { INITIAL_STATE } from '../../reducer/wishlists';
import { mockStore } from '../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
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
let store;

describe('addWishlistSet()', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error if the wishlistId is not set on state', async () => {
    store = wishlistMockStore({ wishlist: { id: null } });

    await expect(
      store.dispatch(addWishlistSet(data)),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"No wishlist id is set"');
    expect(store.getActions()).toHaveLength(1);
  });

  it('should create the correct actions for when adding a wishlist set procedure fails', async () => {
    const expectedError = new Error('post wishlist set error');

    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(addWishlistSet(data)).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the adding a wishlist set procedure is successful', async () => {
    store = wishlistMockStore({ wishlist: { id: mockWishlistId } });
    postWishlistSet.mockResolvedValueOnce(mockWishlistsSetResponse);

    expect.assertions(5);

    await store.dispatch(addWishlistSet(data)).then(clientResult => {
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
