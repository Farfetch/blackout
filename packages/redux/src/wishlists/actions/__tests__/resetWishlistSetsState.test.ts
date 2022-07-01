import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlistSetsState } from '../';

let store;

describe('resetWishlistSetsState()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    store.dispatch(resetWishlistSetsState(fieldsToReset));

    expect(store.getActions()).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
    ]);
  });

  it('should dispatch the correct action with no fields to reset', () => {
    store.dispatch(resetWishlistSetsState());

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
    ]);
  });
});
