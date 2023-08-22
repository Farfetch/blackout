import {
  ADD_ITEM_TO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_SET_SUCCESS,
} from '../../../../wishlists/redux/actionTypes';
import { mockSharedWishlistState } from 'tests/__fixtures__/sharedWishlists';
import { mockStore } from '../../../../../tests';
import INITIAL_STATE from '../../reducer';
import updateSharedWishlistUponItemsChanges from '../updateSharedWishlistUponItemsChanges';

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  doUpdateSharedWishlist: jest.fn(() => () => ({ type: 'foo' })),
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
      updateSharedWishlistUponItemsChanges,
    ]);

    store.dispatch({ type: 'foo' });

    const actions = store.getActions();

    expect(actions).toEqual(expect.arrayContaining([{ type: 'foo' }]));
  });

  it.each([
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    DELETE_WISHLIST_ITEM_SUCCESS,
    UPDATE_WISHLIST_ITEM_SUCCESS,
    UPDATE_WISHLIST_SET_SUCCESS,
  ])('should intercept %s, and do nothing for a guest user', actionType => {
    const store = mockStore(
      { sharedWishlist: INITIAL_STATE },
      { entities: { user: { isGuest: true } } },
      [updateSharedWishlistUponItemsChanges],
    );

    store.dispatch({ type: actionType });

    const actions = store.getActions();

    expect(actions).toEqual(expect.arrayContaining([{ type: actionType }]));
  });

  it.each([
    UPDATE_WISHLIST_ITEM_SUCCESS,
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    DELETE_WISHLIST_ITEM_SUCCESS,
    UPDATE_WISHLIST_SET_SUCCESS,
  ])(
    'should intercept %s, and update the shared wishlist for a non-guest user',
    actionType => {
      const store = mockStore({ sharedWishlist: INITIAL_STATE }, mockState, [
        updateSharedWishlistUponItemsChanges,
      ]);

      store.dispatch({ type: actionType });

      const actions = store.getActions();

      expect(actions).toEqual(
        expect.arrayContaining([{ type: 'foo' }, { type: actionType }]),
      );
    },
  );
});
