import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSearchIntents } from '..';

describe('resetSearchIntents() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetSearchIntents());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SEARCH_INTENTS,
      },
    ]);
  });
});
