import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetSizeScalesState } from '..';

describe('resetSizeScalesState() action', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ sizeScales: INITIAL_STATE }, {});
    resetSizeScalesState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SIZE_SCALES_STATE,
      },
    ]);
  });
});
