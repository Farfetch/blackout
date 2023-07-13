import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { resetState } from '../../actions';

let store;

describe('resetState()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['error'];

    store.dispatch(resetState(fieldsToReset));
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_SHARED_WISHLIST_STATE,
      },
    ]);
  });
});
