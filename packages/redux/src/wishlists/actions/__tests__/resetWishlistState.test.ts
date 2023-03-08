import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetWishlistState } from '..//index.js';
import INITIAL_STATE from '../../reducer/index.js';

let store: ReturnType<typeof mockStore>;

describe('resetWishlistState()', () => {
  beforeEach(() => {
    store = mockStore({ wishlist: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    resetWishlistState(fieldsToReset)(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_STATE,
      },
    ]);
  });

  it('should dispatch the correct action with no fields to reset', () => {
    resetWishlistState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_STATE,
      },
    ]);
  });
});
