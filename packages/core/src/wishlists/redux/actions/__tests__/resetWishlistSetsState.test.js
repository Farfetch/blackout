import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { resetWishlistSetsState } from '../';

let store;

describe('resetWishlistSetsState()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['id'];

    store.dispatch(resetWishlistSetsState(fieldsToReset));
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_SETS_STATE,
      },
    ]);
  });
});
