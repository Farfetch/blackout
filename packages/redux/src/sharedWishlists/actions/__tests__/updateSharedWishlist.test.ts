import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { INITIAL_STATE } from '../../reducer';
import {
  mockProductImgQueryParam,
  mockSharedWishlistId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistsResponse,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../tests';
import { putSharedWishlist } from '@farfetch/blackout-client';
import { updateSharedWishlist } from '..';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

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

    expect.assertions(4);

    await updateSharedWishlist(mockSharedWishlistId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
      expect(error).toBe(expectedError);
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
