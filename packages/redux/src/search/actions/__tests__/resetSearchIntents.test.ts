import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/searchIntents.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSearchIntents } from '../index.js';

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
