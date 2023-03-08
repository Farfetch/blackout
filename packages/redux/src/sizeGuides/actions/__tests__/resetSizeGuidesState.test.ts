import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSizeGuidesState } from '..//index.js';

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
