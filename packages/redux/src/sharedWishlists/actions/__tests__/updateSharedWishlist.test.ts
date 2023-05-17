import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockProductImgQueryParam,
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistsResponse,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { putSharedWishlist } from '@farfetch/blackout-client';
import { updateSharedWishlist } from '../index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putSharedWishlist: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ sharedWishlist: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;

let store: ReturnType<typeof sharedWishlistMockStore>;

describe('updateSharedWishlist()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore(mockSharedWishlistState);
  });

  it('should create the correct actions for when updating a shared wishlist procedure fails', async () => {
    const expectedError = new Error('update shared wishlist error');

    (putSharedWishlist as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateSharedWishlist(mockSharedWishlistId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(putSharedWishlist).toHaveBeenCalledTimes(1);
    expect(putSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
      },
      {
        payload: { error: expectedError },
        type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the update shared wishlist procedure is successful', async () => {
    (putSharedWishlist as jest.Mock).mockResolvedValueOnce(
      mockSharedWishlistsResponse,
    );

    await updateSharedWishlist(mockSharedWishlistId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockSharedWishlistsResponse);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(putSharedWishlist).toHaveBeenCalledTimes(1);
    expect(putSharedWishlist).toHaveBeenCalledWith(
      mockSharedWishlistId,
      expectedConfig,
    );
    expect(storeActions).toMatchObject([
      {
        type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
      },
      {
        payload: mockSharedWishlistNormalizedPayload,
        type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Update wishlist item success payload',
    );
  });
});
