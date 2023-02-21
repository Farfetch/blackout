import * as subscriptionsActionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import clearAllUnsubscribeSubscriptionTopicRecipientRequests from '../clearAllUnsubscribeSubscriptionTopicRecipientRequests';
import reducer from '../../reducer';

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
