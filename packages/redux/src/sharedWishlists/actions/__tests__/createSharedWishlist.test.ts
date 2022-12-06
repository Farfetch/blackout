import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { createSharedWishlist } from '..';
import { INITIAL_STATE } from '../../reducer';
import {
  mockProductImgQueryParam,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistPostData,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../tests';
import { postSharedWishlist } from '@farfetch/blackout-client';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postSharedWishlist: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

const sharedWishlistMockStore = (state = {}) =>
  mockStore({ wishlist: INITIAL_STATE }, state, mockMiddlewares);

const data = mockSharedWishlistPostData;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;

let store: ReturnType<typeof sharedWishlistMockStore>;

describe('createSharedWishlist()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = sharedWishlistMockStore({ sharedWishlist: {} });
  });
  it('should create the correct actions for when create a shared wishlist procedure fails', async () => {
    const expectedError = new Error('post shared wishlist error');

    (postSharedWishlist as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    createSharedWishlist(data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
      expect(error).toBe(expectedError);
      expect(postSharedWishlist).toHaveBeenCalledTimes(1);
      expect(postSharedWishlist).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST,
        },
        {
          payload: { error: expectedError },
          type: actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the create a shared wishlist procedure is successful', async () => {
    (postSharedWishlist as jest.Mock).mockResolvedValueOnce(
      mockSharedWishlistsResponse,
    );

    await createSharedWishlist(data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockSharedWishlistsResponse);
    });

    const storeActions = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postSharedWishlist).toHaveBeenCalledTimes(1);
    expect(postSharedWishlist).toHaveBeenCalledWith(data, expectedConfig);
    expect(storeActions).toMatchObject([
      {
        type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST,
      },
      {
        payload: mockSharedWishlistNormalizedPayload,
        type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      },
    ]);
    expect(storeActions[1]).toMatchSnapshot(
      'Create shared wishlist success payload',
    );
  });
});
