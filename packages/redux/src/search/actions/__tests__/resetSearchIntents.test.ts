import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer/searchIntents';
import { mockStore } from '../../../../tests';
import { resetSearchIntents } from '..';

describe('resetSearchIntents() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ search: INITIAL_STATE }, {});
    resetSearchIntents()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_SEARCH_INTENTS,
      },
    ]);
  });
});
