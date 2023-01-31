import { actionTypes } from '../../';
import { doResetSearch } from '../';
import { mockStore } from '../../../../../tests';

let store;

describe('doResetSearch()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct actions when the doResetSearch is called', () => {
    store.dispatch(doResetSearch());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
      },
      {
        type: actionTypes.RESET_SEARCH_INTENTS,
      },
      {
        type: actionTypes.RESET_SEARCH_SUGGESTIONS,
      },
    ]);
  });
});
