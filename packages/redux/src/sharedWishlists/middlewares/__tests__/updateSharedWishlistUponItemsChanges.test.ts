import * as actionTypes from '../../../wishlists/actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockSharedWishlistId,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists/sharedWishlists.fixtures.mjs';
import { mockStore } from '../../../../tests/index.js';
import { updateSharedWishlist } from '../../actions/index.js';
import thunk from 'redux-thunk';
import updateSharedWishlistUponItemsChanges from '../updateSharedWishlistUponItemsChanges.js';
import type { UserEntity } from '../../../index.js';

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  updateSharedWishlist: jest.fn(() => () => ({ type: 'foo' })),
}));

describe('updateSharedWishlistUponItemsChanges', () => {
  it('should do nothing if the action is not adding, deleting or updating a wishlist item', () => {
    const store = mockStore({ sharedWishlist: INITIAL_STATE }, {}, [
      updateSharedWishlistUponItemsChanges,
    ]);

    store.dispatch({ type: 'foo' });

    expect(updateSharedWishlist).not.toHaveBeenCalled();
  });

  it.each([
    actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
    actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
    actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
  ])('should intercept %s, and do nothing for a guest user', actionType => {
    const store = mockStore(
      { sharedWishlist: INITIAL_STATE },
      { entities: { user: { isGuest: true } as UserEntity } },
      [updateSharedWishlistUponItemsChanges],
    );

    store.dispatch({ type: actionType });

    expect(updateSharedWishlist).not.toHaveBeenCalled();
  });

  it.each([
    actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
    actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
    actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
  ])(
    'should intercept %s, and update the shared wishlist for a non-guest user',
    actionType => {
      const store = mockStore(
        mockSharedWishlistState,
        {
          entities: {
            ...mockSharedWishlistState.entities,
            user: { isGuest: false } as UserEntity,
          },
        },
        [thunk, updateSharedWishlistUponItemsChanges],
      );

      store.dispatch({
        type: actionType,
      });

      expect(updateSharedWishlist).toHaveBeenCalledWith(mockSharedWishlistId);
    },
  );
});
