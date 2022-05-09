import { mockStore } from '../../../../tests';
import clearAllUnsubscribeRecipientFromTopicRequests from '../clearAllUnsubscribeRecipientFromTopicRequests';
import reducer, { actionTypes } from '../..';

describe('reset()', () => {
  let store: ReturnType<typeof mockStore>;
  const randomAction = { type: 'this_is_a_random_action' };
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    clearAllUnsubscribeRecipientFromTopicRequests()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
      },
    ]);
  });
});
