import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSharedWishlist } from '../index.js';
import INITIAL_STATE from '../../reducer.js';

let store: ReturnType<typeof mockStore>;

describe('resetSharedWishlist()', () => {
  beforeEach(() => {
    store = mockStore({ wishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct actions when resetting', () => {
    resetSharedWishlist()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_SHARED_WISHLIST_STATE,
      },
      {
        type: actionTypes.RESET_SHARED_WISHLIST_ENTITIES,
      },
    ]);
  });
});
