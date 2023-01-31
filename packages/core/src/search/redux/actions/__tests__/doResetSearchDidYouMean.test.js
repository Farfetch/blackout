import { actionTypes } from '../../';
import { doResetSearchDidYouMean } from '../';
import { mockStore } from '../../../../../tests';

describe('doResetSearchDidYouMean() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(doResetSearchDidYouMean());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
      },
    ]);
  });
});
