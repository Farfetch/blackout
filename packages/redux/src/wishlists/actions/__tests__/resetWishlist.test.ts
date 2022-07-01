import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlist } from '../';

let store;

describe('resetWishlist()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct actions when resetting', () => {
    store.dispatch(resetWishlist());

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
