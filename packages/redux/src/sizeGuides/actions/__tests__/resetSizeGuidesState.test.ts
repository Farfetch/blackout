import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetSizeGuidesState } from '../';

describe('resetSizeGuidesState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ sizeGuides: INITIAL_STATE }, {});
    resetSizeGuidesState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SIZE_GUIDES_STATE,
      },
    ]);
  });
});
