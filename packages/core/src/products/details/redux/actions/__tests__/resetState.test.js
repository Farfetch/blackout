import { actionTypes } from '../../';
import { mockStore } from '../../../../../../tests';
import { resetState } from '../';

describe('resetState() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetState());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_DETAILS_STATE,
      },
    ]);
  });
});
