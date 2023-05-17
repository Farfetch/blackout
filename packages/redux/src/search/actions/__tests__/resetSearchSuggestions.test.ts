import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/searchSuggestions.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSearchSuggestions } from '../index.js';

describe('resetSearchSuggestions() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ search: INITIAL_STATE }, {});
    resetSearchSuggestions()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_SUGGESTIONS,
      },
    ]);
  });
});
