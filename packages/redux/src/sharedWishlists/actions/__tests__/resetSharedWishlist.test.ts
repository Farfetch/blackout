import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSharedWishlist } from '..';
import INITIAL_STATE from '../../reducer';

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
