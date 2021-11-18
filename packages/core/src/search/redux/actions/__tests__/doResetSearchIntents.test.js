import { actionTypes } from '../../';
import { doResetSearchIntents } from '../';
import { mockStore } from '../../../../../tests';

describe('doResetSearchIntents() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(doResetSearchIntents());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_INTENTS,
      },
    ]);
  });
});
