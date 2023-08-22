import {
  CREATE_SHARED_WISHLIST_SUCCESS,
  REMOVE_SHARED_WISHLIST_SUCCESS,
} from '../../actionTypes';
import { mockSharedWishlistState } from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../../tests';
import getWishlistSetsUponSharedWishlistIdChanges from '../updateSharedWishlistUponItemsChanges';
import INITIAL_STATE from '../../reducer';

jest.mock('../../../../wishlists/redux/actions', () => ({
  ...jest.requireActual('../../../../wishlists/redux/actions'),
  doGetWishlistSets: jest.fn(() => () => ({ type: 'foo' })),
}));
const mockState = {
  ...mockSharedWishlistState,
  entities: {
    ...mockSharedWishlistState.entities,
    user: { isGuest: false },
  },
};

describe('updateSharedWishlistUponItemsChanges', () => {
  it('should do nothing if the action is not adding, deleting or updating a wishlist item', () => {
    const store = mockStore({ sharedWishlist: INITIAL_STATE }, mockState, [
      getWishlistSetsUponSharedWishlistIdChanges,
    ]);

    store.dispatch({ type: 'foo' });

    const actions = store.getActions();

    expect(actions).toEqual(expect.arrayContaining([{ type: 'foo' }]));
  });

  it.each([CREATE_SHARED_WISHLIST_SUCCESS, REMOVE_SHARED_WISHLIST_SUCCESS])(
    'should intercept %s, and do nothing for a guest user',
    actionType => {
      const store = mockStore(
        { sharedWishlist: INITIAL_STATE },
        { entities: { user: { isGuest: true } } },
        [getWishlistSetsUponSharedWishlistIdChanges],
      );

      store.dispatch({ type: actionType });

      const actions = store.getActions();

      expect(actions).toEqual(expect.arrayContaining([{ type: actionType }]));
    },
  );

  it.each([CREATE_SHARED_WISHLIST_SUCCESS, REMOVE_SHARED_WISHLIST_SUCCESS])(
    'should intercept %s, and get the wishlist sets for a non-guest user',
    actionType => {
      const store = mockStore({ sharedWishlist: INITIAL_STATE }, mockState, [
        getWishlistSetsUponSharedWishlistIdChanges,
      ]);

      store.dispatch({ type: actionType });

      const actions = store.getActions();

      expect(actions).toEqual(expect.arrayContaining([{ type: actionType }]));
    },
  );
});
