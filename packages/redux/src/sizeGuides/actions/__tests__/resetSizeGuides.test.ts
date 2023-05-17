import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSizeGuides } from '../index.js';

describe('resetSizeGuides() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ sizeGuides: INITIAL_STATE }, {});
    resetSizeGuides()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SIZE_GUIDES_STATE,
      },
    ]);
  });
});
