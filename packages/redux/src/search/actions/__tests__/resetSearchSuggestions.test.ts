import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer/searchSuggestions';
import { mockStore } from '../../../../tests';
import { resetSearchSuggestions } from '..';

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
