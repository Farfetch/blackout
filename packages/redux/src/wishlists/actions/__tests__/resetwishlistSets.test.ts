import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetWishlistSets } from '../index.js';
import INITIAL_STATE from '../../reducer/index.js';

let store: ReturnType<typeof mockStore>;

describe('resetWishlistSets()', () => {
  beforeEach(() => {
    store = mockStore({ wishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct actions when resetting', () => {
    resetWishlistSets()(store.dispatch);

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
