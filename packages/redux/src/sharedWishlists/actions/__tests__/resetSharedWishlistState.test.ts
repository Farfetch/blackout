import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSharedWishlistState } from '../index.js';
import INITIAL_STATE from '../../reducer.js';

let store: ReturnType<typeof mockStore>;

describe('resetSharedWishlistState()', () => {
  beforeEach(() => {
    store = mockStore({ sharedWishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    resetSharedWishlistState(fieldsToReset)(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_SHARED_WISHLIST_STATE,
      },
    ]);
  });

  it('should dispatch the correct action with no fields to reset', () => {
    resetSharedWishlistState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_SHARED_WISHLIST_STATE,
      },
    ]);
  });
});
