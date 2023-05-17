import * as subscriptionsActionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import clearAllUnsubscribeSubscriptionTopicRecipientRequests from '../clearAllUnsubscribeSubscriptionTopicRecipientRequests.js';
import reducer from '../../reducer/index.js';

describe('reset()', () => {
  let store: ReturnType<typeof mockStore>;
  const randomAction = { type: 'this_is_a_random_action' };

  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    clearAllUnsubscribeSubscriptionTopicRecipientRequests()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: subscriptionsActionTypes.CLEAR_ALL_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FROM_REQUESTS,
      },
    ]);
  });
});
