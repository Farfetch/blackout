import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSizeScalesState } from '..';

describe('resetSizeScalesState() action', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetSizeScalesState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SIZE_SCALES_STATE,
      },
    ]);
  });
});
