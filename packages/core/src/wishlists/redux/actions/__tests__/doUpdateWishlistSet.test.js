import { doUpdateWishlistSet } from '../';
import { mockStore } from '../../../../../tests';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistSetPatchData,
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

describe('doUpdateWishlistSet()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const patchWishlistsSet = jest.fn();
  const getWishlistsSet = jest.fn();
  const action = doUpdateWishlistSet(patchWishlistsSet, getWishlistsSet);
  const data = mockWishlistSetPatchData;
  const expectedConfig = undefined;
  beforeEach(() => {
    jest.clearAllMocks();

    store = wishlistMockStore({
      wishlist: { id: mockWishlistId },
    });
  });

  it('should create the correct actions for when the delete wishlist set procedure fails', async () => {
    const expectedError = new Error('update wishlist set error');

    patchWishlistsSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockWishlistSetId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchWishlistsSet).toHaveBeenCalledTimes(1);
      expect(patchWishlistsSet).toHaveBeenCalledWith(
        mockWishlistId,
        mockWishlistSetId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { wishlistSetId: mockWishlistSetId },
            type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
          },
          {
            meta: { wishlistSetId: mockWishlistSetId },
            payload: { error: expectedError },
            type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update wishlist set procedure is successful', async () => {
    patchWishlistsSet.mockResolvedValueOnce(mockWishlistsSetResponse);
    getWishlistsSet.mockResolvedValueOnce(mockWishlistsSetResponse);

    await store.dispatch(action(mockWishlistSetId, data));

    const actionResults = store.getActions();
    // Only the update actions matter, the actions from the `GET` are on the respective test file
    const updateActionsResults = actionResults.slice(0, 2);

    expect(patchWishlistsSet).toHaveBeenCalledTimes(1);
    expect(patchWishlistsSet).toHaveBeenCalledWith(
      mockWishlistId,
      mockWishlistSetId,
      data,
      expectedConfig,
    );
    expect(updateActionsResults).toMatchObject([
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
      },
      {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      }),
    ).toMatchSnapshot('update wishlist set success payload');
    // Ensure the `GET` is called
    expect(getWishlistsSet).toHaveBeenCalledTimes(1);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
  });
});
