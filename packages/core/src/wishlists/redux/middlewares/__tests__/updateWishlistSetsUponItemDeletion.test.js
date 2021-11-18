import { DELETE_WISHLIST_ITEM_SUCCESS } from '../../actionTypes';
import { doGetWishlistSets } from '../../actions';
import { mockStore } from '../../../../../tests';
import { updateWishlistSetsUponItemDeletion } from '../';

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  doGetWishlistSets: jest.fn(() => () => ({ type: 'foo' })),
}));

describe('updateWishlistSetsUponItemDeletion', () => {
  it('should do nothing if the action is not deleting a wishlist item', () => {
    const store = mockStore(null, {}, [updateWishlistSetsUponItemDeletion]);

    store.dispatch({ type: 'foo' });

    expect(doGetWishlistSets).not.toHaveBeenCalled();
  });

  it('should intercept an item deleted and do nothing for a guest user', () => {
    const store = mockStore(
      null,
      {
        entities: { user: { isGuest: true } },
      },
      [updateWishlistSetsUponItemDeletion],
    );

    store.dispatch({
      type: DELETE_WISHLIST_ITEM_SUCCESS,
    });

    expect(doGetWishlistSets).not.toHaveBeenCalled();
  });

  it('should intercept an item deleted and update the wishlist sets for a non-guest user', () => {
    const store = mockStore(
      null,
      {
        entities: { user: { isGuest: false } },
      },
      [updateWishlistSetsUponItemDeletion],
    );

    store.dispatch({
      type: DELETE_WISHLIST_ITEM_SUCCESS,
    });

    expect(doGetWishlistSets).toHaveBeenCalled();
  });
});
