import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSizeGuidesState } from '../';

describe('resetSizeGuidesState() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetSizeGuidesState());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SIZE_GUIDES_STATE,
      },
    ]);
  });
});
