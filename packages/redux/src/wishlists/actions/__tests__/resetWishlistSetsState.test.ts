import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetWishlistSetsState } from '..//index.js';
import INITIAL_STATE from '../../reducer/index.js';

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
