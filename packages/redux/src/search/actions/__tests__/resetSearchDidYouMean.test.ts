import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/searchDidYouMean.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSearchDidYouMean } from '../index.js';

describe('resetSearchDidYouMean() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ search: INITIAL_STATE }, {});
    resetSearchDidYouMean()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
      },
    ]);
  });
});
