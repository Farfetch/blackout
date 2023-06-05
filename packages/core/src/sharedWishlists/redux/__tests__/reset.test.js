import * as actionTypes from '../actionTypes';
import { mockStore } from '../../../../tests';
import { reset } from '../actions';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action when there are no fields to reset', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      { payload: {}, type: actionTypes.RESET_SHARED_WISHLIST_STATE },
      { type: actionTypes.RESET_SHARED_WISHLIST_ENTITIES },
    ]);
  });
});
