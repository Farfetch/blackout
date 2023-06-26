import { actionTypes } from '../../';
import { mockStore } from '../../../../../../tests';
import { reset } from '../';

describe('reset() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(reset());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_LISTING_FACETS,
      },
      {
        type: actionTypes.RESET_LISTING_STATE,
      },
      {
        type: actionTypes.RESET_LISTING_ENTITIES,
      },
    ]);
  });
});
