import { fetchWishlistSets } from '../../actions/index.js';
import { mockStore } from '../../../../tests/index.js';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import { REMOVE_WISHLIST_ITEM_SUCCESS } from '../../actionTypes.js';
import { updateWishlistSetsUponItemDeletion } from '..//index.js';
import thunk from 'redux-thunk';

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  fetchWishlistSets: jest.fn(() => () => ({ type: 'foo' })),
}));

describe('updateWishlistSetsUponItemDeletion', () => {
  it('should do nothing if the action is not deleting a wishlist item', () => {
    const store = mockStore(null, {}, [updateWishlistSetsUponItemDeletion]);

    store.dispatch({ type: 'foo' });

    expect(fetchWishlistSets).not.toHaveBeenCalled();
  });

  it('should intercept an item deleted and do nothing for a guest user', () => {
    const store = mockStore(
      null,
      {
        entities: { user: { ...mockUsersResponse, isGuest: true } },
      },
      [updateWishlistSetsUponItemDeletion],
    );

    store.dispatch({
      type: REMOVE_WISHLIST_ITEM_SUCCESS,
    });

    expect(fetchWishlistSets).not.toHaveBeenCalled();
  });

  it('should intercept an item deleted and update the wishlist sets for a non-guest user', () => {
    const store = mockStore(
      null,
      {
        entities: { user: { ...mockUsersResponse, isGuest: false } },
      },
      [thunk, updateWishlistSetsUponItemDeletion],
    );

    store.dispatch({
      type: REMOVE_WISHLIST_ITEM_SUCCESS,
    });

    expect(fetchWishlistSets).toHaveBeenCalled();
  });
});
