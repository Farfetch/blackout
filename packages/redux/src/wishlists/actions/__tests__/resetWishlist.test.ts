import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlist } from '../';
import INITIAL_STATE from '../../reducer';

let store: ReturnType<typeof mockStore>;

describe('resetWishlist()', () => {
  beforeEach(() => {
    store = mockStore({ wishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct actions when resetting', () => {
    resetWishlist()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_STATE,
      },
      {
        type: actionTypes.RESET_WISHLIST_ENTITIES,
      },
    ]);
  });
});
