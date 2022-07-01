import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSearchDidYouMean } from '..';

describe('resetSearchDidYouMean() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetSearchDidYouMean());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
      },
    ]);
  });
});
