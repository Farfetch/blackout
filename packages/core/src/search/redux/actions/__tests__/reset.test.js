// @TODO: Remove this file in version 2.0.0.
import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { reset } from '../';

describe('reset() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH,
      },
    ]);
  });
});
