import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlistSetsState } from '../';
import INITIAL_STATE from '../../reducer';

let store: ReturnType<typeof mockStore>;

describe('resetWishlistSetsState()', () => {
  beforeEach(() => {
    store = mockStore({ wishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    resetWishlistSetsState(fieldsToReset)(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
    ]);
  });

  it('should dispatch the correct action with no fields to reset', () => {
    resetWishlistSetsState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
    ]);
  });
});
