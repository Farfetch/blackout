import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import { resetSubscriptions } from '..';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action', () => {
    store.dispatch(resetSubscriptions());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SUBSCRIPTIONS,
      },
    ]);
  });
});
