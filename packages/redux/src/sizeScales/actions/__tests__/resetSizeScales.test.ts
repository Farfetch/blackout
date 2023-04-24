import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSizeScales } from '../index.js';

describe('resetSizeScales() action', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ sizeScales: INITIAL_STATE }, {});
    resetSizeScales()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SIZE_SCALES_STATE,
      },
    ]);
  });
});
