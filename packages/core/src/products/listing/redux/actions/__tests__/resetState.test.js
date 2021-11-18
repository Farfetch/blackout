import { actionTypes } from '../../';
import { mockStore } from '../../../../../../tests';
import { resetState } from '../';

describe('resetState() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetState());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_LISTING_STATE,
      },
    ]);
  });
});
