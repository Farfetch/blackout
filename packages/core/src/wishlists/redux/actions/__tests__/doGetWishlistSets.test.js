import { doGetWishlistSets } from '../';
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

describe('doGetWishlistSets()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getWishlistsSets = jest.fn();
  const action = doGetWishlistSets(getWishlistsSets);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the get wishlist sets procedure fails', async () => {
    const expectedError = new Error('get wishlist sets error');

    getWishlistsSets.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getWishlistsSets).toHaveBeenCalledTimes(1);
      expect(getWishlistsSets).toHaveBeenCalledWith(
        mockWishlistId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_WISHLIST_SETS_REQUEST },
          {
            type: actionTypes.GET_WISHLIST_SETS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get wishlist sets procedure is successful', async () => {
    getWishlistsSets.mockResolvedValueOnce([mockWishlistsSetResponse]);
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getWishlistsSets).toHaveBeenCalledTimes(1);
    expect(getWishlistsSets).toHaveBeenCalledWith(
      mockWishlistId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_WISHLIST_SETS_REQUEST },
      {
        payload: {
          ...mockWishlistsSetNormalizedPayload,
          result: [mockWishlistSetId],
        },
        type: actionTypes.GET_WISHLIST_SETS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_WISHLIST_SETS_SUCCESS,
      }),
    ).toMatchSnapshot('get wishlist sets success payload');
  });
});
