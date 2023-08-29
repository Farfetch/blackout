import * as actionTypes from '../../actionTypes.js';
import { fetchWishlistSets } from '../../../wishlists/actions/index.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockWishlistId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/wishlists.fixtures.mjs';
import getWishlistSetsUponSharedWishlistIdChanges from '../getWishlistSetsUponSharedWishlistIdChanges.js';
import thunk from 'redux-thunk';
import type { UserEntity } from '../../../index.js';

jest.mock('../../../wishlists/actions', () => ({
  ...jest.requireActual('../../actions'),
  fetchWishlistSets: jest.fn(() => () => ({ type: 'foo' })),
}));

describe('getWishlistSetsUponSharedWishlistIdChanges', () => {
  it('should do nothing if the action is not creating or deleting a shared wishlist', () => {
    const store = mockStore({ sharedWishlist: INITIAL_STATE }, {}, [
      getWishlistSetsUponSharedWishlistIdChanges,
    ]);

    store.dispatch({ type: 'foo' });

    expect(fetchWishlistSets).not.toHaveBeenCalled();
  });

  it.each([
    actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
    actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
  ])('should intercept %s, and do nothing for a guest user', actionType => {
    const store = mockStore(
      mockWishlistState,
      {
        entities: {
          ...mockWishlistState.entities,
          user: { isGuest: true } as UserEntity,
        },
      },
      [getWishlistSetsUponSharedWishlistIdChanges],
    );

    store.dispatch({ type: actionType });

    expect(fetchWishlistSets).not.toHaveBeenCalled();
  });

  it.each([
    actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
    actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
  ])(
    'should intercept %s, and fetch the wishlist sets for a non-guest user',
    actionType => {
      const store = mockStore(
        mockWishlistState,
        {
          entities: {
            ...mockWishlistState.entities,
            user: { isGuest: false } as UserEntity,
          },
        },
        [thunk, getWishlistSetsUponSharedWishlistIdChanges],
      );

      store.dispatch({
        type: actionType,
      });

      expect(fetchWishlistSets).toHaveBeenCalledWith(mockWishlistId);
    },
  );
});
