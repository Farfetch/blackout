import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetWishlistState } from '../';

let store;

describe('resetWishlistState()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    store.dispatch(resetWishlistState(fieldsToReset));

    expect(store.getActions()).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_STATE,
      },
    ]);
  });

  it('should dispatch the correct action with no fields to reset', () => {
    store.dispatch(resetWishlistState());

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_STATE,
      },
    ]);
  });
});
