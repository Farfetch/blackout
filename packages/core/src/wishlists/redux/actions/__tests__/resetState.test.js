import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { resetState } from '../';

let store;

describe('resetState()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['id'];

    store.dispatch(resetState(fieldsToReset));
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_WISHLIST_STATE,
      },
    ]);
  });
});
