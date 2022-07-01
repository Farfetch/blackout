import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetBrandsState } from '..';

describe('resetBrandsState() action', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetBrandsState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_BRANDS_STATE,
      },
    ]);
  });
});
