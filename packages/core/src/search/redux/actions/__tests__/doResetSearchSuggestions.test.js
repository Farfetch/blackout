import { actionTypes } from '../../';
import { doResetSearchSuggestions } from '../';
import { mockStore } from '../../../../../tests';

describe('doResetSearchSuggestions() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(doResetSearchSuggestions());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_SUGGESTIONS,
      },
    ]);
  });
});
