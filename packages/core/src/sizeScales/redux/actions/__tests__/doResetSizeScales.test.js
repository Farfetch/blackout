import { actionTypes } from '../..';
import { doResetSizeScales } from '..';
import { mockStore } from '../../../../../tests';

describe('doResetSizeScales() action', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(doResetSizeScales());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SIZESCALES,
      },
    ]);
  });
});
