import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlistSets } from '../';

let store;

describe('resetWishlistSets()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct actions when resetting', () => {
    store.dispatch(resetWishlistSets());

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
      {
        type: actionTypes.RESET_WISHLIST_SETS_ENTITIES,
      },
    ]);
  });
});
