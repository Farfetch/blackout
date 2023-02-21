import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetSubscriptions } from '..';
import reducer from '../../reducer';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };

describe('resetSubscriptions()', () => {
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct actions', () => {
    resetSubscriptions()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_USER_SUBSCRIPTIONS,
      },
      {
        type: actionTypes.RESET_SUBSCRIPTION_PACKAGES,
      },
    ]);
  });
});
