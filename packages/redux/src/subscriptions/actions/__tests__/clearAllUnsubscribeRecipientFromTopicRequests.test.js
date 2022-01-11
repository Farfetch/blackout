import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import clearAllUnsubscribeRecipientFromTopicRequests from '../clearAllUnsubscribeRecipientFromTopicRequests';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action', () => {
    store.dispatch(clearAllUnsubscribeRecipientFromTopicRequests());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
      },
    ]);
  });
});
