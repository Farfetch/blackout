import * as subscriptionsActionTypes from '../../actionTypes';
import { clearAllUnsubscribeRecipientFromTopic } from '../clearAllUnsubscribeRecipientFromTopicRequests';
import { mockStore } from '../../../../tests';
import reducer from '../../reducer';

describe('reset()', () => {
  let store: ReturnType<typeof mockStore>;
  const randomAction = { type: 'this_is_a_random_action' };
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    clearAllUnsubscribeRecipientFromTopic()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: subscriptionsActionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
      },
    ]);
  });
});
