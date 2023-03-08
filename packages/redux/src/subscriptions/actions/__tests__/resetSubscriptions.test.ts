import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSubscriptions } from '../index.js';
import reducer from '../../reducer/index.js';

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
