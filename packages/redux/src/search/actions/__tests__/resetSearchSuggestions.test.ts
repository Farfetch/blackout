import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSearchSuggestions } from '..';

describe('resetSearchSuggestions() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetSearchSuggestions());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_SUGGESTIONS,
      },
    ]);
  });
});
