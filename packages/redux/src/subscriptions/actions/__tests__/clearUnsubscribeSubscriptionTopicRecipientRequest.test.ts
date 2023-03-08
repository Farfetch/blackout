import * as subscriptionsActionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import clearUnsubscribeSubscriptionTopicRecipientRequest from '../clearUnsubscribeSubscriptionTopicRecipientRequest.js';
import reducer from '../../reducer/index.js';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    const mockRecipientId = 'foo';

    clearUnsubscribeSubscriptionTopicRecipientRequest(mockRecipientId)(
      store.dispatch,
    );

    expect(store.getActions()).toEqual([
      {
        payload: { recipientId: mockRecipientId },
        type: subscriptionsActionTypes.CLEAR_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST,
      },
    ]);
  });
});
