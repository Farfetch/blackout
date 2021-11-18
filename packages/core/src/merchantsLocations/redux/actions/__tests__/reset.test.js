import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { reset } from '../';

describe('reset() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(reset());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_MERCHANTS_LOCATIONS,
      },
    ]);
  });
});
