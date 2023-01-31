import { doGetWishlistSet } from '../';
import { mockStore } from '../../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetNormalizedPayload,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];

const wishlistMockStore = (state = {}) =>
  mockStore({ wishlist: reducer() }, state, mockMiddlewares);

describe('doGetWishlistSet()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getWishlistsSet = jest.fn();
  const action = doGetWishlistSet(getWishlistsSet);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the get wishlist set procedure fails', async () => {
    const expectedError = new Error('get wishlist set error');

    getWishlistsSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistSetId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getWishlistsSet).toHaveBeenCalledTimes(1);
      expect(getWishlistsSet).toHaveBeenCalledWith(
        mockWishlistId,
        mockWishlistSetId,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_WISHLIST_SET_REQUEST,
            meta: { wishlistSetId: mockWishlistSetId },
          },
          {
            type: actionTypes.GET_WISHLIST_SET_FAILURE,
            payload: { error: expectedError },
            meta: { wishlistSetId: mockWishlistSetId },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get wishlist set procedure is successful', async () => {
    getWishlistsSet.mockResolvedValueOnce(mockWishlistsSetResponse);
    await store.dispatch(action(mockWishlistSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlistsSet).toHaveBeenCalledTimes(1);
    expect(getWishlistsSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_WISHLIST_SET_REQUEST,
        meta: { wishlistSetId: mockWishlistSetId },
      },
      {
        payload: mockWishlistsSetNormalizedPayload,
        type: actionTypes.GET_WISHLIST_SET_SUCCESS,
        meta: { wishlistSetId: mockWishlistSetId },
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_WISHLIST_SET_SUCCESS }),
    ).toMatchSnapshot('get wishlist set success payload');
  });
});
