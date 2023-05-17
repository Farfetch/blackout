import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetSubscriptionPackages } from '../index.js';
import reducer from '../../reducer/index.js';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };

describe('resetSubscriptionPackages()', () => {
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    resetSubscriptionPackages()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SUBSCRIPTION_PACKAGES,
      },
    ]);
  });
});
